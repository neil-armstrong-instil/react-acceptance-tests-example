import "./Button.scss";
import type {FC, ReactElement} from "react";
import React from "react";
import type {IconType} from "@src/react/components/code-system/components/button/types/IconType";
import {ReactComponent as AddIcon} from "@src/generated/icons/add-more-plus.svg";
import {ReactComponent as DeleteIcon} from "@src/generated/icons/delete.svg";
import mergeClassNames from "classnames";

interface Props {
  className?: string;
  iconType?: IconType;
  onClick?: () => void;
}

export const Button: FC<Props> = (
  {
    className,
    iconType,
    onClick
  }
) => {
  const mergedClassNames = mergeClassNames("button", {
    [`${className}`]: className
  });

  return (
    <button
      className={mergedClassNames}
      onClick={onClick}
    >
      {svgFromIconType(iconType)}
    </button>
  );
};

function svgFromIconType(iconType: IconType | undefined): ReactElement | null {
  switch (iconType) {
    case "Add":
      return <AddIcon/>;
    case "Delete":
      return <DeleteIcon/>;
    default:
      return null;
  }
}
