import { useMemo } from "react";
import { getClasses, type InputState } from "./input";
import classNames from "classnames";
import Typography from "../typography";

interface Props {
  state?: InputState;
  id?: string;
  label?: string;
  placeholder?: string;
  help?: string;

  options?: { text: string; value: string }[];
  value?: string[];
  onChange?: (str: string[]) => void;
}
export default function Input(props: Props) {
  const { labelClasses, inputClasses, helpClasses, wrapperClasses } =
    useMemo(() => {
      return getClasses(props);
    }, [props]);

  return (
    <div className={wrapperClasses}>
      <Typography type="label" className={labelClasses}>
        {props.label}
      </Typography>

      <select
        multiple
        className={classNames(inputClasses)}
        size={props.options?.length}
        value={props.value}
        onChange={(e) => {
          console.log(Array.from(e.target.selectedOptions, (opt) => opt.value));
          if (props.onChange) {
            props.onChange(
              Array.from(e.target.selectedOptions, (opt) => opt.value),
            );
          }
        }}
      >
        {props.options?.map((x) => (
          <option value={x.value}>{x.text}</option>
        ))}
      </select>
      <Typography size="sm" className={classNames("mt-2", helpClasses)}>
        {props.help}
      </Typography>
    </div>
  );
}
