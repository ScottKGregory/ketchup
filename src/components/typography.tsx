import classNames from "classnames";
import type { PropsWithChildren } from "react";
import {
  TextAlignment,
  TextSize,
  type Alignment,
  type Size,
} from "../helpers/classes";

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
    | "span"
    | "code"
    | "label";

  bold?: boolean;
  underlined?: boolean;
  italic?: boolean;
  align?: Alignment;
  strike?: boolean;
  uppercase?: boolean;
  columns?: 1 | 2 | 3 | 4;
  size?: Size;
  noColour?: boolean;

  className?: string;
}

export default function Typography(props: Props) {
  const textColour = props.noColour ? "" : "text-gray-700 dark:text-gray-300";
  let classes = classNames(
    "font-sans",
    "last:mb-0",
    {
      "font-semibold": props.bold,
      underline: props.underlined,
      "font-italic": props.italic,
      "line-through": props.strike,
      uppercase: props.uppercase,
    },
    TextAlignment(props.align),
    TextSize(props.size),
    textColour,
    props.className,
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
          className={classNames(
            classes,
            "-mt-2 mb-4 font-heading text-lg font-light",
          )}
        >
          {props.children}
        </p>
      );
    case "h1":
      return (
        <h1
          className={classNames(
            classes,
            "mb-4 font-heading text-5xl font-extrabold",
          )}
        >
          {props.children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={classNames(
            classes,
            "mb-4 font-heading text-4xl font-bold",
          )}
        >
          {props.children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={classNames(
            classes,
            "mb-4 font-heading text-3xl font-bold",
          )}
        >
          {props.children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={classNames(
            classes,
            "mb-4 font-heading text-2xl font-bold",
          )}
        >
          {props.children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={classNames(classes, "mb-4 font-heading text-xl font-bold")}
        >
          {props.children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={classNames(classes, "mb-4 font-heading text-lg font-bold")}
        >
          {props.children}
        </h6>
      );
    case "leading":
      return (
        <p
          className={classNames(classes, "mb-3 text-lg md:text-xl", textColour)}
        >
          {props.children}
        </p>
      );
    case "drop-cap":
      return (
        <p
          className={classNames(
            classes,
            "mb-3",
            textColour,
            "first-letter:float-start first-letter:me-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100",
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
            "my-8 border-s-4 border-gray-300 bg-gray-50 p-4 dark:bg-gray-800",
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
    case "code":
      return (
        <pre
          className={classNames(classes, "mb-3 font-mono text-sm", textColour)}
        >
          <code>{props.children}</code>
        </pre>
      );
    case "label":
      return (
        <label className={classNames(classes, "mb-1 inline-block", textColour)}>
          {props.children}
        </label>
      );
    case "p":
    default:
      return (
        <p className={classNames(classes, "mb-3", textColour)}>
          {props.children}
        </p>
      );
  }
}
