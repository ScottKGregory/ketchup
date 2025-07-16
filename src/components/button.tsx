import classNames from "classnames";
import Spinner from "./spinner";

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  float?: "right" | "left";
}

export default function Button(props: Props) {
  return (
    <button
      type="button"
      className={classNames(
        "shadow-md transition-all",
        "mb-2 me-2 inline-flex rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white",
        "hover:bg-primary-800",
        "focus:outline-none focus:ring-4 focus:ring-primary-300",
        "disabled:bg-gray-400",
        {
          "float-end me-0": props.float === "right",
          "float-start ms-0": props.float === "right",
        },
        props.className,
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading && <Spinner loading inline />}
      {props.text}
    </button>
  );
}
