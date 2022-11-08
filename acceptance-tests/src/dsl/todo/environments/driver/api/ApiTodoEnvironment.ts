import type {TodoEnvironment} from "@src/dsl/todo/environments/base/TodoEnvironment";
import {BaseApiDriver} from "@src/dsl/shared/drivers/api/BaseApiDriver";
import type {ApiConfig} from "@src/dsl/shared/drivers/api/types/ApiConfig";
import type {Todo} from "@src/dsl/todo/types/Todo";
import {MutationResult} from "@shared/graphql/schema/__generated__/resolvers-types";
import type {TodoAddedResponse, TodoAddedVariables} from "@src/dsl/todo/environments/driver/api/mutations/TodoAddedMutation";
import {todoAddedMutation} from "@src/dsl/todo/environments/driver/api/mutations/TodoAddedMutation";
import type {GetTodosResponse} from "@src/dsl/todo/environments/driver/api/queries/GetTodosQuery";
import {getTodosQuery} from "@src/dsl/todo/environments/driver/api/queries/GetTodosQuery";
import type {TodoDeletedResponse, TodoDeletedVariables} from "@src/dsl/todo/environments/driver/api/mutations/TodoDeletedMutation";
import type {TodosReorderedResponse, TodosReorderedVariables} from "@src/dsl/todo/environments/driver/api/mutations/TodosReorderedMutation";
import {todosReorderedMutation} from "@src/dsl/todo/environments/driver/api/mutations/TodosReorderedMutation";
import type {TodoUpdatedResponse, TodoUpdatedVariables} from "@src/dsl/todo/environments/driver/api/mutations/TodoUpdatedMutation";
import {todoDeletedMutation} from "@src/dsl/todo/environments/driver/api/mutations/TodoDeletedMutation";
import {todoUpdatedMutation} from "@src/dsl/todo/environments/driver/api/mutations/TodoUpdatedMutation";

export class ApiTodoEnvironment extends BaseApiDriver implements TodoEnvironment {
  constructor(config: ApiConfig) {
    super(config);
  }

  override async asyncConstructor(): Promise<void> {
    await super.asyncConstructor();
    await this.refreshEnvironment();
  }

  async refreshEnvironment(): Promise<void> {
    this.driver.clearAuth();
  }

  async count(): Promise<number> {
    const todos = await this.getTodos();

    return todos.length;
  }

  async create(): Promise<Todo> {
    const response = await this.driver.executeGraphqlRequest<TodoAddedResponse, TodoAddedVariables>(todoAddedMutation, {
      newTodo: {
        message: "New todo!"
      }
    });

    if (!response) {
      throw new Error("Could not create todo on api - no result returned");
    }
    const {todoAdded: result} = response;

    if (result.result === MutationResult.Failure || !result.todo) {
      throw new Error(`Could not create todo on api - '${result.message ?? ""}`);
    }

    return {
      id: result.todo.id,
      textContent: result.todo.message
    };
  }

  async delete(todoToDelete: Todo): Promise<void> {
    if (!todoToDelete.id) throw Error("No id provided");

    const response = await this.driver.executeGraphqlRequest<TodoDeletedResponse, TodoDeletedVariables>(todoDeletedMutation, {
      id: todoToDelete.id
    });

    if (!response) {
      throw new Error("Could not delete todo on api - no result returned");
    }
    const {todoDeleted: result} = response;

    if (result.result === MutationResult.Failure) {
      throw new Error(`Could not delete todo on api - '${result.message ?? ""}`);
    }
  }

  async rename(todoToRename: Todo, updatedText: string): Promise<Todo> {
    if (!todoToRename.id) throw Error("No id provided");

    const response = await this.driver.executeGraphqlRequest<TodoUpdatedResponse, TodoUpdatedVariables>(todoUpdatedMutation, {
      id: todoToRename.id,
      todoUpdate: {
        message: updatedText
      }
    });

    if (!response) {
      throw new Error("Could not delete todo on api - no result returned");
    }
    const {todoUpdated: result} = response;

    if (result.result === MutationResult.Failure) {
      throw new Error(`Could not delete todo on api - '${result.message ?? ""}`);
    }

    return {
      id: todoToRename.id,
      textContent: updatedText
    };
  }

  async dropOnto(toDrag: Todo, toDropOnto: Todo): Promise<void> {
    const dragId = toDrag.id;
    if (!dragId) throw Error("No id provided on todo being dragged");

    const dropId = toDropOnto.id;
    if (!dropId) throw Error("No id provided on todo being dropped onto");

    const todos = await this.getTodos();
    const atIndex = todos.findIndex(todo => todo.id === dropId);
    if (atIndex === -1) throw Error("Could not find index of todo being dropped on");

    const response = await this.driver.executeGraphqlRequest<TodosReorderedResponse, TodosReorderedVariables>(todosReorderedMutation, {
      id: dragId,
      atIndex
    });

    if (!response) {
      throw new Error("Could not reorder todos on api - no result returned");
    }
    const {todosReordered: result} = response;

    if (result.result === MutationResult.Failure) {
      throw new Error(`Could not reorder todos on api - '${result.message ?? ""}`);
    }
  }

  async getAtIndex(index: number): Promise<Todo> {
    const todos = await this.getTodos();
    return todos[index];
  }

  private async getTodos(): Promise<Todo[]> {
    const response = await this.driver.executeGraphqlRequest<GetTodosResponse>(getTodosQuery);

    if (response == null) {
      throw new Error("Could not get count of todos on api - no result returned");
    }
    const {todos: result} = response;

    if (result == null) {
      throw new Error("Could not get count of todos on api");
    }

    return result.map(todo => ({
      id: todo.id,
      textContent: todo.message
    }));
  }
}
