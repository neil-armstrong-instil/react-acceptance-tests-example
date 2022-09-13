import type {Environment} from "./types/Environments";

let _environment: Environment = "Development";

export function setEnvironment(environment: Environment): void {
  _environment = environment;
}

export const currentEnvironment = (): Environment => _environment;
