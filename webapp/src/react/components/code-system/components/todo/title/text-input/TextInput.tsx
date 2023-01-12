import "./TextInput.scss";
import type {FC} from "react";
import React from "react";
import mergeClassNames from "classnames";

interface Props {
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const TextInput: FC<Props> = (
  {
    className,
    value,
    onChange
  }
) => {
  const mergedClassNames = mergeClassNames("todo__textInput", {
    [`${className}`]: className
  });

  return (
    <input
      className={mergedClassNames}
      value={value}
      onChange={event => {
        onChange(event.target.value);
      }}
      onFocus={event => {
        event.target.select();
      }}
    />
  );
};
