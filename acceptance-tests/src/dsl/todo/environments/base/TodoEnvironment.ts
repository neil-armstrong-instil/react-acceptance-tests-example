import type {BaseEnvironment} from "@src/dsl/shared/environments/BaseEnvironment";
import type {Todo} from "@src/dsl/todo/types/Todo";

export interface TodoEnvironment extends BaseEnvironment {
  refreshEnvironment(): Promise<void>;

  count(): Promise<number>;
  create(textContent?: string): Promise<Todo>;
  delete(todoToDelete: Todo): Promise<void>;
  rename(todoToRename: Todo, updatedText: string): Promise<Todo>;
  dropOnto(toDrag: Todo, toDropOnto: Todo): Promise<void>;
  getAtIndex(index: number): Promise<Todo>;
}
