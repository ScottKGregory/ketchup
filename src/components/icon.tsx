import type {
  IconName as FaIconName,
  IconPrefix,
} from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { type CSSProperties } from "react";
import Typography from "./typography";

export type IconColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "white"
  | "primary";

export interface Props {
  icon?: FaIconName;
  iconPrefix?: IconPrefix;
  iconColour?: IconColor;
  iconSpin?: boolean;
  iconBadge?: string;
  iconStack?: FaIconName;
  primaryColour?: string;
  secondaryColour?: string;
  stackPrefix?: IconPrefix;
  fixedWidth?: boolean;
  rotate?: number;

  className?: string;
}

export type IconName = FaIconName;

interface Style extends CSSProperties {
  "--fa-primary-color"?: string;
  "--fa-secondary-color"?: string;
}

export default function Icon(props: Props) {
  const prefix = props.iconPrefix ?? "fad";
  const stackPrefix = props.stackPrefix ?? "fas";
  const icon = props.icon || "question-circle";

  const style: Style = {};

  if (props.rotate) {
    style.rotate = `${props.rotate}deg`;
  }
  style["--fa-primary-color"] = props.primaryColour;
  style["--fa-secondary-color"] = props.secondaryColour;

  const cn = classNames({
    "text-green-500": props.iconColour === "green",
    "text-orange-500": props.iconColour === "orange",
    "text-yellow-500": props.iconColour === "yellow",
    "text-red-500": props.iconColour === "red",
    "text-blue-500": props.iconColour === "blue",
    "text-white": props.iconColour === "white",
    "text-primary": props.iconColour === "primary",
  });

  if (props.iconStack) {
    return (
      <span
        className={classNames(props.className, "fa-stack")}
        style={{ height: "1em" }}
      >
        <FontAwesomeIcon
          className={classNames(cn, "fa-stack-1x")}
          icon={{ prefix: stackPrefix, iconName: props.iconStack }}
          spin={props.iconSpin}
          fixedWidth={props.fixedWidth}
          style={style}
        />
        <FontAwesomeIcon
          className={classNames(cn, "fa-stack-1x")}
          icon={{ prefix: prefix, iconName: icon }}
          spin={props.iconSpin}
          fixedWidth={props.fixedWidth}
          style={style}
        />
      </span>
    );
  } else if (props.iconBadge) {
    return (
      <span className={classNames(props.className, "fa-layers", "fa-fw")}>
        <FontAwesomeIcon
          icon={{ prefix: prefix, iconName: icon }}
          spin={props.iconSpin}
          className={cn}
          fixedWidth={props.fixedWidth}
          style={style}
        />
        <span className="fa-layers-counter">{props.iconBadge}</span>
      </span>
    );
  }

  return (
    <Typography type="span" className={classNames("-pb-1")} noColour>
      <FontAwesomeIcon
        className={classNames(cn, props.className)}
        icon={{ prefix: prefix, iconName: icon }}
        spin={props.iconSpin}
        fixedWidth={props.fixedWidth}
        style={style}
      />
    </Typography>
  );
}
