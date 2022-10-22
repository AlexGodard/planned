import React from "react";
import classNames from "classnames";

type CardProps = {
  className?: string;
};

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        className,
        "p-8 border bg-white shadow rounded-lg h-fit"
      )}
    >
      {children}
    </div>
  );
};
