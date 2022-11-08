import type {TodoEnvironment} from "@src/dsl/todo/environments/base/TodoEnvironment";
import {currentEnvironment} from "@src/dsl/shared/environments/providers/EnvironmentProvider";
import {DevelopmentTodoEnvironment} from "@src/dsl/todo/environments/DevelopmentTodoEnvironment";
import {ElectronTodoEnvironment} from "@src/dsl/todo/environments/ElectronTodoEnvironment";
import {WebappTodoEnvironment} from "@src/dsl/todo/environments/WebappTodoEnvironment";
import {AndroidTodoEnvironment} from "@src/dsl/todo/environments/AndroidTodoEnvironment";
import {DeployedApiTodoEnvironment} from "@src/dsl/todo/environments/DeployedApiTodoEnvironment";

export async function buildEnvironment(): Promise<TodoEnvironment> {
  const environment = getEnvironment();
  await environment.asyncConstructor();
  return environment;
}

export function getEnvironment(): TodoEnvironment {
  const environment = currentEnvironment();
  switch (environment) {
    case "Webapp":
      return new WebappTodoEnvironment();
    case "Development":
      return new DevelopmentTodoEnvironment();
    case "Electron":
      return new ElectronTodoEnvironment();
    case "Android":
      return new AndroidTodoEnvironment();
    case "DeployedApi":
      return new DeployedApiTodoEnvironment();
    default:
      throw new Error(`Environment'${environment}' is not setup yet for Todo`);
  }
}
