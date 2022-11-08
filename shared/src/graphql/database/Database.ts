import {cloneDeep} from "lodash";
import type {Todo} from "@shared/graphql/database/types/Todo";
import {reorder} from "@shared/graphql/database/utils/Reorder";

export class Database {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return cloneDeep(this.todos);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  updateTodo(id: string, updatedTodo: Omit<Todo, "id">): void {
    this.todos = this.todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...updatedTodo,
        id
      };
    });
  }

  deleteTodo(id: string): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw Error(`Could not find todo with id ${id}`);

    this.todos.splice(index, 1);
  }

  reorderTodos(id: string, newIndex: number): void {
    const indexOfTodoToMove = this.todos.findIndex(todo => todo.id === id);
    if (indexOfTodoToMove === -1) return;

    this.todos = reorder(
      this.todos,
      indexOfTodoToMove,
      newIndex
    );
  }
}
