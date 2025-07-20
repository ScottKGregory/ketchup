import classNames from "classnames";
import Typography from "../typography";
import { useMemo } from "react";

interface Props {
  type:
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
  state?: "normal" | "error" | "success";
  id?: string;
  label?: string;
  placeholder?: string;
  help?: string;
}
// https://react-hook-form.com/get-started ??????
export default function Input(props: Props) {
  const { labelClasses, inputClasses, helpClasses, wrapperClasses } =
    useMemo(() => {
      let labelClasses = "";
      let inputClasses =
        "block w-full rounded-lg border p-2.5 text-sm transition-all focus:ring-2";
      let helpClasses = "";
      switch (props.state) {
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

      if (props.type === "range") {
        inputClasses = classNames(inputClasses, "h-0");
      }

      return {
        labelClasses,
        inputClasses,
        helpClasses,
        wrapperClasses: "mb-6",
      };
    }, [props.state, props.type]);

  if (props.type === "toggle") {
    return (
      <div className={wrapperClasses}>
        <Typography
          type="label"
          className="me-6 inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            value=""
            className={classNames("peer sr-only")}
          />
          <div
            className={classNames(
              "me-2",
              "peer-checked:bg-primary-600 peer-focus:ring-primary-300",
              "dark:peer-checked:bg-primary-600 dark:peer-focus:ring-primary-800",
              "peer relative h-6 w-11 rounded-full bg-gray-200",
              "after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full",
              "after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
              "peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none",
              "peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700",
            )}
          ></div>
          <Typography type="span" className={labelClasses}>
            {props.label}
          </Typography>
        </Typography>
        <Typography size="sm" className={classNames("mt-0", helpClasses)}>
          {props.help}
        </Typography>
      </div>
    );
  }

  if (props.type === "checkbox") {
    return (
      <div className={wrapperClasses}>
        <div className="flex items-center">
          <input
            checked
            id={props.id}
            type="checkbox"
            value=""
            className={classNames(
              "h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 outline-none focus:ring-primary-500 dark:focus:ring-primary-600",
              "accent-primary-600 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800",
            )}
          />
          <Typography type="label" className={classNames(labelClasses, "ms-2")}>
            {props.label}
          </Typography>
        </div>
        <Typography size="sm" className={classNames("mt-0", helpClasses)}>
          {props.help}
        </Typography>
      </div>
    );
  }

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
