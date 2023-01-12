import type {Todo} from "@src/react/components/code-system/layout/todo/types/Todo";

export type OnTodosChanged = (updatedTodos: Todo[]) => void;
export type OnTodoChanged = (updatedTodo: Todo, indexToUpdate: number) => void;
export type OnTodoDeleted = (indexToDelete: number) => void;
