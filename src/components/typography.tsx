import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { TextAlignment, type Alignment } from "../helpers/classes";

interface Props extends PropsWithChildren {
  type?:
    | "subtitle"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "leading"
    | "drop-cap"
    | "blockquote"
    | "span";

  bold?: boolean;
  underlined?: boolean;
  italic?: boolean;
  align?: Alignment;
  strike?: boolean;
  uppercase?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

export default function Typography(props: Props) {
  let classes = classNames(
    {
      "font-semibold": props.bold,
      underline: props.underlined,
      "font-italic": props.italic,
      "line-through": props.strike,
      uppercase: props.uppercase,
    },
    TextAlignment(props.align),
  );

  switch (props.columns) {
    case 2:
      classes = classNames(classes, "columns-2");
      break;
    case 3:
      classes = classNames(classes, "columns-3");
      break;
    case 4:
      classes = classNames(classes, "columns-4");
      break;
  }

  switch (props.type) {
    case "span":
      return <span className={classes}>{props.children}</span>;
    case "subtitle":
      return (
        <p
          className={classNames(classes, "-mt-2 mb-4 text-lg font-extralight")}
        >
          {props.children}
        </p>
      );
    case "h1":
      return (
        <h1 className={classNames(classes, "mb-4 text-5xl font-extrabold")}>
          {props.children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classNames(classes, "mb-4 text-4xl font-bold")}>
          {props.children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classNames(classes, "mb-4 text-3xl font-bold")}>
          {props.children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={classNames(classes, "mb-4 text-2xl font-bold")}>
          {props.children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={classNames(classes, "mb-4 text-xl font-bold")}>
          {props.children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={classNames(classes, "mb-4 text-lg font-bold")}>
          {props.children}
        </h6>
      );
    case "leading":
      return (
        <p
          className={classNames(
            classes,
            "mb-3 text-lg text-gray-500 md:text-xl",
          )}
        >
          {props.children}
        </p>
      );
    case "drop-cap":
      return (
        <p
          className={classNames(
            classes,
            "mb-3 text-gray-500",
            "first-letter:float-start first-letter:me-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900",
          )}
        >
          {props.children}
        </p>
      );
    case "blockquote":
      return (
        <blockquote
          className={classNames(
            classes,
            "my-4 border-s-4 border-gray-300 bg-gray-50 p-4",
          )}
        >
          <p
            className={classNames(
              classes,
              "text-xl font-medium italic leading-relaxed text-gray-900",
            )}
          >
            "{props.children}"
          </p>
        </blockquote>
      );
    case "p":
    default:
      return (
        <p className={classNames(classes, "mb-3 text-gray-500")}>
          {props.children}
        </p>
      );
  }
}
