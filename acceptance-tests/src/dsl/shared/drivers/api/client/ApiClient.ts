import type {ApiConfig} from "@src/dsl/shared/drivers/api/types/ApiConfig";
import axios from "axios";
import type {DocumentNode} from "@apollo/client";
import {print} from "graphql/language/printer";
import {createUuid} from "@shared/stdlib/Uuid";

let userId: string | undefined = undefined;

export class ApiClient {
  constructor(private config: ApiConfig) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async executeGraphqlRequest<Result, Variables extends Record<string, any> = never>(query: DocumentNode, variables?: Variables): Promise<Result> {
    if (!userId) {
      userId = createUuid();
    }

    const response = await axios.post(
      this.config.apiEndpoint,
      {
        query: print(query),
        variables
      },
      {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          "Accept": "*/*",
          "userId": userId
        }
      }
    );

    if (response.data.errors) {
      console.error(response.data.errors);
      throw Error(`Graphql request failed ${JSON.stringify(response.data.errors, null, 2)}`);
    }

    return response.data.data as Result;
  }

  clearAuth(): void {
    userId = undefined;
  }
}
