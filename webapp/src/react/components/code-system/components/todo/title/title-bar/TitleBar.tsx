import "./TitleBar.scss";
import type {FC, PropsWithChildren} from "react";
import React from "react";
import mergeClassNames from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
}

export const TitleBar: FC<Props> = (
  {
    className,
    children
  }
) => {
  const mergedClassNames = mergeClassNames("todo__titleBar", {
    [`${className}`]: className
  });

  return (
    <div className={mergedClassNames}>
      {children}
    </div>
  );
};
