import classNames from "classnames";
import Typography from "../typography";
import { useMemo } from "react";

export type InputType =
  | "file"
  | "checkbox"
  | "radio"
  | "range"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "image"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | "toggle";

export type InputState = "normal" | "error" | "success";

interface Props {
  type: InputType;
  state?: InputState;
  id?: string;
  label?: string;
  placeholder?: string;
  help?: string;
}
// https://react-hook-form.com/get-started ??????
export default function Input(props: Props) {
  const { labelClasses, inputClasses, helpClasses, wrapperClasses } =
    useMemo(() => {
      return getClasses(props);
    }, [props]);

  // color, date, datetime-local, email, image, month, number, password, search, tel, text, time, url, week, range, file
  return (
    <div className={wrapperClasses}>
      <Typography type="label" className={labelClasses}>
        {props.label}
      </Typography>
      <input
        type={props.type}
        id={props.id}
        className={classNames(inputClasses)}
        placeholder={props.placeholder}
      />
      <Typography size="sm" className={classNames("mt-2", helpClasses)}>
        {props.help}
      </Typography>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function getClasses({
  state,
  type,
}: {
  state?: InputState;
  type?: InputType;
}) {
  let labelClasses = "";
  let inputClasses =
    "block w-full rounded-lg border p-2.5 text-sm transition-all focus:ring-2";
  let helpClasses = "";
  switch (state) {
    case "error":
      labelClasses = "text-red-700 dark:text-red-500";
      inputClasses = classNames(
        inputClasses,
        "accent-red-700 outline-none focus:outline-none",
        "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500",
        "dark:border-red-500 dark:bg-gray-700 dark:text-red-400 dark:placeholder-red-500",
      );
      helpClasses = "text-red-600 dark:text-red-500";
      break;
    case "success":
      labelClasses = "text-green-700 dark:text-green-500";
      inputClasses = classNames(
        inputClasses,
        "accent-green-700 outline-none focus:outline-none",
        "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500",
        "dark:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500",
      );
      helpClasses = "text-green-600 dark:text-green-500";
      break;

    default:
      labelClasses = "";
      inputClasses = classNames(
        inputClasses,
        "accent-primary-700 outline-none focus:outline-none",
        "bg-gray-50 border border-gray-300 text-gray-700 focus:ring-primary-500 focus:border-primary-500",
        "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
      );
      helpClasses = "";
      break;
  }

  if (type === "range") {
    inputClasses = classNames(inputClasses, "h-0");
  }

  return {
    labelClasses,
    inputClasses,
    helpClasses,
    wrapperClasses: "mb-6",
  };
}
