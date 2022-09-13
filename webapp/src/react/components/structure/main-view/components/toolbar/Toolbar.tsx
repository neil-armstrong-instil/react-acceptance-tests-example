import "./Toolbar.scss";
import React from "react";
import type {FC} from "react";
import type {OnTodoAdded} from "@src/react/components/structure/main-view/components/toolbar/types/Callbacks";

interface Props {
  onTodoAdded: OnTodoAdded;
}

export const Toolbar: FC<Props> = (
  {
    onTodoAdded
  }
) => (
  <div className="toolbar">
    <button className="addTodoButton" onClick={onTodoAdded}>Add todo</button>
  </div>
);
