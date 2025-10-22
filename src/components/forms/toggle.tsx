import classNames from "classnames";
import Typography from "../typography";
import { useMemo } from "react";
import { getClasses, type InputState } from "./input";

interface Props {
  type?: "toggle" | "checkbox";
  state?: InputState;
  id?: string;
  label?: string;
  placeholder?: string;
  help?: string;
  checked?: boolean;
  onChange?: (b: boolean) => void;
}

// https://react-hook-form.com/get-started ??????
export default function Toggle(props: Props) {
  const { labelClasses, helpClasses, wrapperClasses } = useMemo(() => {
    return getClasses({ ...props, type: "toggle" });
  }, [props]);

  if (props.type === "checkbox") {
    return (
      <div className={wrapperClasses}>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={props.checked}
            onChange={(e) => {
              if (props.onChange) {
                e.preventDefault();
                props.onChange(e.target.checked);
              }
            }}
            className={classNames(
              "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded-xs border-gray-300 bg-gray-100 outline-hidden",
              "accent-primary-600 focus:ring-2 focus:outline-hidden dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800",
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
  return (
    <div className={wrapperClasses}>
      <Typography
        type="label"
        className="me-6 inline-flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(e) => {
            if (props.onChange) {
              e.preventDefault();
              props.onChange(e.target.checked);
            }
          }}
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
            "peer-focus:outline-hidden peer-checked:after:translate-x-full peer-checked:after:border-white",
            "peer-focus:ring-4 peer-checked:rtl:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700",
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
