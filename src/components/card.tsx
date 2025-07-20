import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { Padding, type Size } from "../helpers/classes";

interface Props extends PropsWithChildren {
  className?: string;
  padding?: Size;
  level?: "root" | "secondary";
  onClick?: () => void;
}

export default function Card(props: Props) {
  const level = props.level ? props.level : "root";

  return (
    <section
      className={classNames(
        "rounded-lg",
        { "bg-white shadow-lg dark:bg-gray-900": level === "root" },
        { "bg-gray-200 shadow-lg dark:bg-gray-800": level === "secondary" },
        { "hover:cursor-pointer": props.onClick },
        props.className,
        Padding(props.padding),
      )}
      onClick={props.onClick}
    >
      {props.children}
    </section>
  );
}
