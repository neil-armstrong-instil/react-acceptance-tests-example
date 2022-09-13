import type {Environment} from "@src/dsl/shared/environments/providers/types/Environments";

type TestMode = Environment | undefined;

export const testMode = process.env.ACCEPTANCE_TESTS_MODE as TestMode;
