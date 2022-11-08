import {ApiTodoEnvironment} from "@src/dsl/todo/environments/driver/api/ApiTodoEnvironment";

export class DeployedApiTodoEnvironment extends ApiTodoEnvironment {
  constructor() {
    super({
      apiEndpoint: "http://localhost:4000"
    });
  }
}
