import {cloneDeep} from "lodash";
import type {Todo} from "@src/database/types/Todo";

export class Database {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return cloneDeep(this.todos);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  deleteTodo(id: string): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw Error(`Could not find todo with id ${id}`);

    this.todos.splice(index, 1);
  }

  reorderTodos(newOrderAsIds: string[]): void {
    const asObject = this.todos.reduce<Record<string, Todo>>((acc, todo) => {
      return {
        ...acc,
        [todo.id]: todo
      };
    }, {});

    this.todos = newOrderAsIds.map(id => ({
      ...asObject[id]
    }));
  }
}
