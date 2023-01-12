import "./Todos.scss";
import type {FC} from "react";
import React from "react";
import {TodoCard} from "@src/react/components/code-system/layout/todo/TodoCard";
import type {OnTodoChanged, OnTodoDeleted, OnTodosChanged} from "@src/react/components/app/components/main-view/components/todos/types/Callbacks";
import type {Todo} from "@src/react/components/code-system/layout/todo/types/Todo";

interface Props {
  todos: Todo[];
  onTodosChanged: OnTodosChanged;
  onTodoChanged: OnTodoChanged;
  onDelete: OnTodoDeleted;
}

export const Todos: FC<Props> = (
  {
    todos,
    onTodosChanged,
    onTodoChanged,
    onDelete
  }
) => {
  return (
    <div className="todos">
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todos={todos}
          todo={todo}
          onTodosChanged={onTodosChanged}
          onTodoChanged={updatedTodo => onTodoChanged(updatedTodo, index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};
