import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Container(props: Props) {
  return (
    <section
      className={classNames(
        "mx-auto mt-16 max-w-(--breakpoint-xl) first-of-type:mt-32 last-of-type:mb-32",
        props.className,
      )}
    >
      {props.children}
    </section>
  );
}
