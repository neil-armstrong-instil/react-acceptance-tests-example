import type {Event, State} from "jest-circus";
import {TestEnvironment as NodeEnvironment} from "jest-environment-node";

export default class FailedTestStateReporter extends NodeEnvironment {
  async handleTestEvent(event: Event, state: State): Promise<void> {
    const testDetails = state.currentlyRunningTest;
    if (!testDetails) return;
    if (!testDetails.errors || testDetails.errors.length === 0) return;

    // `this.global` is the global available on the test instance, while `global` is just for the test runner
    this.global["acceptance-test-failed-test-details"] = testDetails;
  }
}
