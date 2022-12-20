import axios from "axios";

const apiToken = process.env.RENDER_APIKEY;
if (!apiToken) {
  throw new Error("Could not get render api key");
}

interface Deployment {
  deploy: {
    id: string;
    commit?: {
      id: string;
      message: string;
      createdAt: string;
    };
    status: string;
    finishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

async function checkDeployments(): Promise<void> {
  console.log("Checking deployments to 'render.com'...\n");

  await waitForDeployment("Webapp", "srv-cdqc0larrk09t4b2bd50");
  await waitForDeployment("API", "srv-cdqc0larrk09t4b2bd40");

  console.log("All deployments successful!");
}

async function waitForDeployment(deploymentName: string, webappServiceId: string): Promise<void> {
  const fiveMinutes = 300000;
  process.stdout.write(`Checking ${deploymentName} deployment...`);

  try {
    await waitFor(async () => {
      const latestDeployment = await getLatestDeployment(webappServiceId);
      if (latestDeployment.deploy.status !== "live") {
        process.stdout.write(".");
        throw new Error("Deployment still not live");
      }
    }, fiveMinutes, 1000);
  } catch (error) {
    console.error(`\n${deploymentName} deployment failed ❌ `);
    throw error;
  }

  console.log(`\n${deploymentName} deployment successful ✅ \n`);
}

async function getLatestDeployment(serviceId: string): Promise<Deployment> {
  const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/deploys?limit=20`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiToken}`
    }
  });

  if (response.status !== 200) {
    throw new Error("Failed to get deployments");
  }

  const deployments = response.data as Deployment[];
  if (deployments.length === 0) {
    throw new Error("Could not find any deployments");
  }

  return deployments[0];
}

export async function waitFor(callback: () => Promise<void>, timeout = 1000, interval = 100): Promise<void> {
  try {
    return await callback();
  } catch (error) {
    await performWaitFor(callback, timeout, interval, 0, error as Error);
  }
}

async function performWaitFor(callback: () => Promise<void>, timeout: number, interval: number, timeWaited: number, error: Error): Promise<void> {
  if (timeWaited > timeout) {
    throw error ?? new Error("Was waiting for response but failed for unknown reason");
  }

  await setTimeoutAsync(async () => {
    try {
      return await callback();
    } catch (error) {
      await performWaitFor(callback, timeout, interval, timeWaited + interval, error as Error);
    }
  }, interval);
}

export function setTimeoutAsync(callback: (args: void) => Promise<void>, waitForThisManyMilliseconds?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await callback();
        resolve();
      } catch (error) {
        reject(error);
      }
    }, waitForThisManyMilliseconds);
  });
}

checkDeployments().catch(error => {
  console.error(error);
  process.exit(1);
});
