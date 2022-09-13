import type {TodoEnvironment} from "@src/dsl/todo/environments/base/TodoEnvironment";
import {currentEnvironment} from "@src/dsl/shared/environments/providers/EnvironmentProvider";
import {DevelopmentSystemDesignEnvironment} from "@src/dsl/todo/environments/DevelopmentSystemDesignEnvironment";
import {ElectronSystemDesignEnvironment} from "@src/dsl/todo/environments/ElectronSystemDesignEnvironment";
import {WebappSystemDesignEnvironment} from "@src/dsl/todo/environments/WebappSystemDesignEnvironment";
import {AndroidSystemDesignEnvironment} from "@src/dsl/todo/environments/AndroidSystemDesignEnvironment";

export async function buildEnvironment(): Promise<TodoEnvironment> {
  const environment = getEnvironment();
  await environment.asyncConstructor();
  return environment;
}

export function getEnvironment(): TodoEnvironment {
  const environment = currentEnvironment();
  switch (environment) {
    case "Webapp":
      return new WebappSystemDesignEnvironment();
    case "Development":
      return new DevelopmentSystemDesignEnvironment();
    case "Electron":
      return new ElectronSystemDesignEnvironment();
    case "Android":
      return new AndroidSystemDesignEnvironment();
    default:
      throw new Error(`Environment'${environment}' is not setup yet for Todo`);
  }
}
