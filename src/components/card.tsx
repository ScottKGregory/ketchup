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
        "rounded-lg shadow-lg",
        props.className,
        Padding(props.padding),
      )}
    >
      {props.children}
    </section>
  );
}
