import classNames from "classnames";
import Spinner from "./spinner";

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button(props: Props) {
  return (
    <button
      type="button"
      className={classNames(
        "mb-2 me-2 inline-flex rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white",
        "hover:bg-red-800",
        "focus:outline-none focus:ring-4 focus:ring-red-300",
        "disabled:bg-gray-400",
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading && <Spinner loading inline />}
      {props.text}
    </button>
  );
}
