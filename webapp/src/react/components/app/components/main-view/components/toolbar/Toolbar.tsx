import "./Toolbar.scss";
import React from "react";
import type {FC} from "react";
import type {OnTodoAdded} from "@src/react/components/app/components/main-view/components/toolbar/types/Callbacks";
import {Button} from "@src/react/components/code-system/components/button/Button";

interface Props {
  onTodoAdded: OnTodoAdded;
}

export const Toolbar: FC<Props> = (
  {
    onTodoAdded
  }
) => (
  <div className="toolbar">
    <Button
      className="addTodoButton"
      iconType="Add"
      onClick={onTodoAdded}
    />
  </div>
);
