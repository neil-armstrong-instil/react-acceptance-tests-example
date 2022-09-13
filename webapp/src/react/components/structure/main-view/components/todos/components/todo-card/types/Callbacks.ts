import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";

export type OnTodoChanged = (newTodo: Todo) => void;
export type OnTodoDeleted = () => void;
