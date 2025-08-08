import classNames from "classnames";
import Spinner from "./spinner";
import type { PropsWithChildren } from "react";
import Icon, { type Props as IconProps } from "./icon";

interface Props {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  float?: "right" | "left";
  icon?: IconProps;
  noBackground?: boolean;

  link?: string;
  download?: boolean;
}

export default function Button(props: PropsWithChildren<Props>) {
  const classes = classNames(
    "shadow-md transition-all",
    "mb-2 me-2 inline-flex rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white gap-2",
    "hover:bg-primary-800",
    {
      "focus:outline-none focus:ring-4 focus:ring-primary-300":
        !props.noBackground,
    },
    "disabled:bg-gray-400",
    {
      "float-end me-0": props.float === "right",
      "float-start ms-0": props.float === "right",
    },
    {
      "bg-transparent p-0 shadow-none hover:bg-transparent w-fit h-fit hover:text-primary-500":
        props.noBackground,
    },
    props.className,
  );

  if (props.link) {
    return (
      <a className={classes} href={props.link} download={props.download}>
        <Icon {...props.icon} className="text-lg" />
        {props.text}
      </a>
    );
  }

  if (props.icon && !props.text) {
    return (
      <button
        onClick={props.onClick}
        className={classNames(classes, "aspect-square h-fit w-fit p-0 pt-5")}
      >
        <Icon {...props.icon} className="text-lg" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading && <Spinner loading inline />}
      {!props.loading && props.icon && (
        <Icon
          {...props.icon}
          className="-mb-0.5 p-0 text-lg"
          iconColour="white"
        />
      )}
      {props.text}
      {props.children}
    </button>
  );
}
