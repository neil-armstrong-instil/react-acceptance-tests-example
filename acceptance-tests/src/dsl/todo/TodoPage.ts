import type {TodoEnvironment} from "./environments/base/TodoEnvironment";
import {buildEnvironment} from "./environments/builder/TodoEnvironmentBuilder";
import {BaseDsl} from "@src/dsl/shared/dsl/BaseDsl";
import type {Todo} from "@src/dsl/todo/types/Todo";
import {DslError} from "@src/dsl/shared/errors/DslError";

export class TodoPage extends BaseDsl<TodoEnvironment> {
  constructor(environment: TodoEnvironment) {
    super(environment);
  }

  async navigateToPage(): Promise<void> {
    await this.environment.refreshEnvironment();
  }

  async count(): Promise<number> {
    try {
      return this.environment.count();
    } catch (error) {
      throw new DslError("Failed to get the count of todos", error);
    }
  }

  async create(textContent?: string): Promise<Todo> {
    try {
      return this.environment.create(textContent);
    } catch (error) {
      throw new DslError("Failed to create a todo", error);
    }
  }

  async delete(todoToDelete: Todo): Promise<void> {
    try {
      return this.environment.delete(todoToDelete);
    } catch (error) {
      throw new DslError(`Failed to delete todo ${DslError.toString(todoToDelete)}`, error);
    }
  }

  async rename(todoToRename: Todo, updatedText: string): Promise<Todo> {
    try {
      return this.environment.rename(todoToRename, updatedText);
    } catch (error) {
      throw new DslError(`Failed to rename todo ${DslError.toString(todoToRename)} with new next ${updatedText}`, error);
    }
  }

  async dropOnto(toDrag: Todo, toDropOnto: Todo): Promise<void> {
    try {
      return this.environment.dropOnto(toDrag, toDropOnto);
    } catch (error) {
      throw new DslError(`Failed to drag todo ${DslError.toString(toDrag)} onto ${toDropOnto}`, error);
    }
  }

  async getAtIndex(index: number): Promise<Todo> {
    try {
      return this.environment.getAtIndex(index);
    } catch (error) {
      throw new DslError(`Failed to find todo at index ${index}`, error);
    }
  }
}

export const buildTodoPage = async (): Promise<TodoPage> => new TodoPage(await buildEnvironment());
