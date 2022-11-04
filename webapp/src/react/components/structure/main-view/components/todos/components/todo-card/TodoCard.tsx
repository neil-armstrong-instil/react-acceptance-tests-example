import "./TodoCard.scss";
import type {FC} from "react";
import React, {useCallback, useRef} from "react";
import type {Todo} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Todo";
import type {OnTodoChanged, OnTodoDeleted} from "@src/react/components/structure/main-view/components/todos/components/todo-card/types/Callbacks";
import {useDrag, useDrop} from "react-dnd";
import {todoDragIdentifier} from "@src/react/components/structure/main-view/components/todos/types/TodoDragIdentifier";
import {reorder} from "@src/react/components/structure/main-view/components/todos/utils/Reorder";
import type {OnTodosChanged} from "@src/react/components/structure/main-view/components/todos/types/Callbacks";

interface Props {
  todos: Todo[];
  todo: Todo;
  onTodosChanged: OnTodosChanged;
  onTodoChanged: OnTodoChanged;
  onDelete: OnTodoDeleted;
}

export const TodoCard: FC<Props> = (
  {
    todos,
    todo,
    onTodosChanged,
    onTodoChanged,
    onDelete
  }
) => {
  const todoRef = useRef<HTMLDivElement>(null);

  const [, registerDropTarget] = useDrop<Todo>({
    accept: todoDragIdentifier("todo"),
    hover(itemBeingDragged) {
      const itemBeingHoveredIndex = todos.indexOf(todo);
      const itemBeingDraggedIndex = todos.indexOf(itemBeingDragged);

      if (itemBeingDraggedIndex === -1 || itemBeingHoveredIndex === itemBeingDraggedIndex) return;

      const reorderedItems = reorder(
        todos,
        itemBeingDraggedIndex,
        itemBeingHoveredIndex
      );

      onTodosChanged(reorderedItems);
    }
  });

  const [, registerDragTarget] = useDrag({
    type: todoDragIdentifier("todo"),
    item: todo,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const onTodoTextChanged = useCallback((newText: string) => {
    onTodoChanged({
      ...todo,
      textContent: newText
    });
  }, [onTodoChanged, todo]);

  registerDropTarget(registerDragTarget(todoRef));

  const containerClassName = "todoCard";

  return (
    <div ref={todoRef} className={containerClassName}>
      <input
        className={`${containerClassName}__text`}
        value={todo.textContent}
        onChange={(event) => onTodoTextChanged(event.target.value)}
        onFocus={(event) => event.currentTarget.select()}
      />

      <button
        className={`${containerClassName}__delete`}
        onClick={onDelete}
      >
        🗑
      </button>
    </div>
  );
};
