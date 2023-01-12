import type {Todo} from "@src/react/components/code-system/layout/todo/types/Todo";

export type OnTodoChanged = (newTodo: Todo) => void;
export type OnTodoDeleted = () => void;
