import classNames from "classnames";
import type { PropsWithChildren } from "react";
import Icon from "./icon";
import Typography from "./typography";

interface Props extends PropsWithChildren {
  loading?: boolean;
  inline?: boolean;
}

export default function Spinner(props: Props) {
  return (
    <div
      className={classNames("relative", {
        "h-0 w-0": props.inline && !props.loading,
      })}
    >
      {!props.inline && props.children && (
        <div
          className={classNames("rounded-lg transition-all duration-500", {
            "pointer-events-none blur-xs": props.loading,
          })}
        >
          {props.children}
        </div>
      )}
      <div
        className={classNames("transition-all duration-500", {
          "opacity-0": !props.loading,
          "pointer-events-none opacity-100": props.loading,
          "absolute-center": !props.inline,
        })}
      >
        <Typography type="span" size={props.inline ? undefined : "4xl"}>
          <Icon icon="spinner" iconSpin iconPrefix="fas" />
        </Typography>
      </div>
    </div>
  );
}
