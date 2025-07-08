import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Card(props: Props) {
  return (
    <section
      className={classNames("rounded-lg p-4 shadow-lg", props.className)}
    >
      {props.children}
    </section>
  );
}
