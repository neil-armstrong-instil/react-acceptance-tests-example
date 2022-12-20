import {ApiTodoEnvironment} from "@src/dsl/todo/environments/driver/api/ApiTodoEnvironment";

export class DeployedApiTodoEnvironment extends ApiTodoEnvironment {
  constructor() {
    super({
      apiEndpoint: "https://acceptance-test-example-api-9peu.onrender.com"
    });
  }
}
