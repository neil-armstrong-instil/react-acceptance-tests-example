import {setEnvironment} from "./shared/environments/providers/EnvironmentProvider";
import {testMode} from "./shared/providers/Environment";
import {describe, beforeAll} from "@jest/globals";
import type {Environment} from "./shared/environments/providers/types/Environments";

export function runTestsOn(
  environments: Environment[],
  testSetup: () => void
): void {
  environments.forEach(environment => {
    if (testMode !== undefined && testMode !== environment) return;

    // eslint-disable-next-line jest/valid-describe-callback,jest/valid-title
    describe(environment, () => {
      beforeAll(() => {
        setEnvironment(environment);
      });

      testSetup();
    });
  });
}
