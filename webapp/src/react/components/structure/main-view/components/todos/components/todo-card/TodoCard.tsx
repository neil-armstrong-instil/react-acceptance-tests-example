import "./TodoCard.scss";
import React, {useCallback} from "react";
import type {FC} from "react";
import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";
import type {OnTodoChanged, OnTodoDeleted} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Callbacks";

interface Props {
  todo: Todo;
  onChange: OnTodoChanged;
  onDelete: OnTodoDeleted;
}

export const TodoCard: FC<Props> = (
  {
    todo,
    onChange,
    onDelete
  }
) => {
  const onTodoTextChanged = useCallback((newText: string) => {
    onChange({
      ...todo,
      textContent: newText
    });
  }, [onChange, todo]);

  const containerClassName = "todoCard";

  return (
    <div className={containerClassName}>
      <input className={`${containerClassName}__text`} value={todo.textContent} onChange={(event) => onTodoTextChanged(event.target.value)}/>
      <button className={`${containerClassName}__delete`} onClick={onDelete}>🗑</button>
    </div>
  );
};
