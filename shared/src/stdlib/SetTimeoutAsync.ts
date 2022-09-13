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

export async function waitFor(waitForThisManyMilliseconds?: number): Promise<void> {
  await setTimeoutAsync(async (): Promise<void> => {
    // Do nothing
  }, waitForThisManyMilliseconds);
}
