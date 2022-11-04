import "./Todos.scss";
import type {FC} from "react";
import React from "react";
import {TodoCard} from "@src/react/components/structure/main-view/components/todos/components/todo-card/TodoCard";
import type {OnTodoChanged, OnTodoDeleted, OnTodosChanged} from "@src/react/components/structure/main-view/components/todos/types/Callbacks";
import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";

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
    <div className="todoCards">
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
