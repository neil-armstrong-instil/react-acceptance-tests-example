import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";

export type OnTodosChanged = (updatedTodos: Todo[]) => void;
export type OnTodoChanged = (updatedTodo: Todo, indexToUpdate: number) => void;
export type OnTodoDeleted = (indexToDelete: number) => void;
