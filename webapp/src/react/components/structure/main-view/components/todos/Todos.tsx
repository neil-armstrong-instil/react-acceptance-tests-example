import "./Todos.scss";
import React from "react";
import {TodoCard} from "@src/react/components/structure/main-view/components/todos/components/todo-card/TodoCard";
import type {FC} from "react";
import type {OnTodoChanged, OnTodoDeleted} from "@src/react/components/structure/main-view/components/todos/types/Callbacks";
import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";

interface Props {
  todos: Todo[];
  onChange: OnTodoChanged;
  onDelete: OnTodoDeleted;
}

export const Todos: FC<Props> = (
  {
    todos,
    onChange,
    onDelete
  }
) => (
  <div className="todoCards">
    {todos.map((todo, index) => (
      <TodoCard
        key={index}
        todo={todo}
        onChange={updatedTodo => onChange(updatedTodo, index)}
        onDelete={() => onDelete(index)}
      />
    ))}
  </div>
);
