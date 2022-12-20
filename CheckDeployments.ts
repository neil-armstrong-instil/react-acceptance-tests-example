import axios from "axios";
import {execSync} from "child_process";

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
  console.log("Checking deployments to 'render'...\n");

  try {
    const webappServiceId = "srv-cdqc0larrk09t4b2bd50";
    await waitForDeployment(webappServiceId);
  } catch (error) {
    console.error("Webapp deployment failed ❌ ");
    throw error;
  }
  console.log("Webapp deployment successful ✅ ");

  try {
    const apiServiceId = "srv-cdqc0larrk09t4b2bd40";
    await waitForDeployment(apiServiceId);
  } catch (error) {
    console.error("Api deployment failed ❌ ");
    throw error;
  }
  console.log("API deployment successful ✅ ");

  console.log("\nAll deployments successful");
}

async function waitForDeployment(webappServiceId: string): Promise<void> {
  await waitFor(async () => {
    const webappDeployment = await getLatestDeployment(webappServiceId);
    if (webappDeployment.deploy.status !== "live") {
      throw new Error("Deployment still not live");
    }
  }, 5000, 100);
}

async function getLatestDeployment(serviceId: string): Promise<Deployment> {
  const apiToken = process.env.RENDER_APIKEY;
  if (!apiToken) throw new Error("Could not get render api key");

  const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/deploys?limit=20`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiToken}`
    }
  });

  if (response.status !== 200) {
    console.log(response);
    throw new Error("Failed to get deployments");
  }

  const deployments = response.data as Deployment[];
  const latestDeployment = deployments.find(deployment => {
    const commitDetails = deployment.deploy.commit;
    if (!commitDetails) return false;

    return commitDetails.id === getLatestCommitHash();
  });
  if (!latestDeployment) throw new Error(`Could not find deployment with commit hash ${getLatestCommitHash()}`);

  return latestDeployment;
}

const getLatestCommitHash = buildLatestCommitHashFetcher();

function buildLatestCommitHashFetcher(): () => string {
  let commitHash: string | undefined = undefined;

  return () => {
    if (commitHash) return commitHash;

    commitHash = execSync("git rev-parse HEAD").toString().trim();
    return commitHash;
  };
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
