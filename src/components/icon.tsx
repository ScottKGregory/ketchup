import type {
  IconName as FaIconName,
  IconPrefix,
} from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Typography from "./typography";
import { GetColour, type Colour } from "../helpers/classes";

export interface Props {
  icon?: FaIconName;
  iconPrefix?: IconPrefix;
  iconColour?: Colour;
  iconSpin?: boolean;
  iconBadge?: string;
  iconStack?: FaIconName;
  stackPrefix?: IconPrefix;
  rotate?: number;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";

  className?: string;
}

export type IconName = FaIconName;

export default function Icon(props: Props) {
  const prefix = props.iconPrefix ?? "fas";
  const stackPrefix = props.stackPrefix ?? "fas";
  const icon = props.icon || "question-circle";

  const cn = classNames(GetColour("text", props.iconColour, 600));

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
          size={props.size}
        />
        <FontAwesomeIcon
          className={classNames(cn, "fa-stack-1x")}
          icon={{ prefix: prefix, iconName: icon }}
          spin={props.iconSpin}
          size={props.size}
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
          size={props.size}
        />
        <span className="fa-layers-counter">{props.iconBadge}</span>
      </span>
    );
  }

  return (
    <Typography type="span" className={classNames("-pb-1", cn)} noColour>
      <FontAwesomeIcon
        className={classNames(cn, props.className)}
        icon={{ prefix: prefix, iconName: icon }}
        spin={props.iconSpin}
        size={props.size}
      />
    </Typography>
  );
}
