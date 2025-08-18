import classNames from "classnames";
import { useState, type PropsWithChildren } from "react";
import { Padding, type Size } from "../helpers/classes";
import Button from "./button";

interface Props extends PropsWithChildren {
  className?: string;
  padding?: Size;
  level?: "root" | "secondary";
  noBackground?: boolean;
  onClick?: () => void;
  header?: React.ReactNode;
  collapsible?: boolean;
}

export default function Card(props: Props) {
  const [open, setOpen] = useState(!props.collapsible);
  const level = props.level ? props.level : "root";

  return (
    <section
      className={classNames(
        "rounded-lg",
        {
          "bg-white shadow-lg dark:bg-gray-900":
            level === "root" && !props.noBackground,
        },
        {
          "bg-gray-200 shadow-lg dark:bg-gray-800":
            level === "secondary" && !props.noBackground,
        },
        { "hover:cursor-pointer": props.onClick },
        props.className,
        Padding(props.padding),
      )}
      onClick={props.onClick}
    >
      {props.header && (
        <div
          className={classNames(
            "flex",
            open ? Padding(props.padding, "pb") : "",
          )}
        >
          <div className="flex-1">{props.header}</div>
          {props.collapsible && (
            <Button
              className="mr-0 mt-0 pr-0 pt-0"
              noBackground
              icon={{
                icon: open ? "caret-down" : "caret-up",
                iconPrefix: "fas",
              }}
              onClick={() => {
                setOpen((o) => !o);
              }}
            />
          )}
        </div>
      )}
      <div className={classNames({ hidden: !open })}>{props.children}</div>
    </section>
  );
}
