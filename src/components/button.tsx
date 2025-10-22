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
  noPadding?: boolean;
  noMargin?: boolean;

  link?: string;
  download?: boolean;
}

export default function Button(props: PropsWithChildren<Props>) {
  const classes = classNames(
    "hover:cursor-pointer",
    "shadow-md transition-all",
    " inline-flex rounded-lg bg-primary-700 text-sm font-medium text-white gap-2",
    { "mb-2 me-2": !props.noMargin },
    "hover:bg-primary-800",
    {
      "focus:outline-hidden focus:ring-4 focus:ring-primary-300":
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
    {
      "p-0": props.noPadding,
      "px-5 py-2.5": !props.noPadding,
    },
  );

  if (props.link) {
    return (
      <a
        className={classNames(classes, props.className)}
        href={props.link}
        download={props.download}
      >
        <Icon {...props.icon} className="text-lg" />
        {props.text}
      </a>
    );
  }

  if (props.icon && !props.text) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.onClick) {
            props.onClick();
          }
        }}
        className={classNames(
          classes,
          "aspect-square h-fit w-fit",
          { "p-0 pt-5": !props.noPadding },
          props.className,
        )}
      >
        <Icon {...props.icon} className="text-lg" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNames(classes, props.className)}
      onClick={(e) => {
        e.preventDefault();
        if (props.onClick) {
          props.onClick();
        }
      }}
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
