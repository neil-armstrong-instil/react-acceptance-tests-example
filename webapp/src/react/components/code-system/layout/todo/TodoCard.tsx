import "./TodoCard.scss";
import type {FC} from "react";
import React, {useCallback, useRef} from "react";
import type {Todo} from "@src/react/components/code-system/layout/todo/types/Todo";
import type {OnTodoChanged, OnTodoDeleted} from "@src/react/components/code-system/layout/todo/types/Callbacks";
import {useDrag, useDrop} from "react-dnd";
import {todoDragIdentifier} from "@src/react/components/code-system/layout/todo/types/TodoDragIdentifier";
import {reorder} from "@src/react/utils/drag-and-drop/Reorder";
import type {OnTodosChanged} from "@src/react/components/app/components/main-view/components/todos/types/Callbacks";
import {TitleBar} from "@src/react/components/code-system/components/todo/title/title-bar/TitleBar";
import {TextInput} from "@src/react/components/code-system/components/todo/title/text-input/TextInput";
import {Button} from "@src/react/components/code-system/components/button/Button";

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

  return (
    <div
      className="todoCard"
      ref={todoRef}
    >
      <TitleBar>
        <TextInput
          value={todo.textContent}
          onChange={onTodoTextChanged}
        />
      </TitleBar>

      <div className="bottomBar">
        <Button
          iconType="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
