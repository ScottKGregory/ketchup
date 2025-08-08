import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface Props {
  text: string;
  direction?: "top" | "left";
}

export default function Tooltip(props: PropsWithChildren<Props>) {
  const direction = props.direction || "top";

  return (
    <span className="group relative">
      <span
        className={classNames(
          "bg-opacity[95%] absolute break-inside-avoid whitespace-nowrap bg-gray-700 p-2 text-sm text-white opacity-0 transition-all duration-75 group-hover:opacity-100",
          {
            "-top-2 left-1/2 -translate-x-1/2 -translate-y-full":
              direction === "top",
            "right-full top-1/2 -translate-x-2 -translate-y-1/2":
              direction === "left",
          },
        )}
      >
        {props.text}
      </span>
      {props.children}
    </span>
  );
}
