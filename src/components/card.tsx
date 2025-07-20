import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { Padding, type Size } from "../helpers/classes";

interface Props extends PropsWithChildren {
  className?: string;
  padding?: Size;
}

export default function Card(props: Props) {
  return (
    <section
      className={classNames(
        "rounded-lg bg-white shadow-lg dark:bg-gray-900",
        props.className,
        Padding(props.padding),
      )}
    >
      {props.children}
    </section>
  );
}
