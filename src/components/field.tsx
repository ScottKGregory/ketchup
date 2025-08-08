import { type PropsWithChildren, useMemo } from "react";
import formatDate from "../helpers/dates";
import Typography from "./typography";

interface Props {
  label: string;
  text?: string | number | Date | boolean | null;
  hideEmpty?: boolean;
}

export default function Field(props: PropsWithChildren<Props>) {
  const content = useMemo(() => {
    if (props.children) {
      return props.children;
    }

    if (typeof props.text === "number") {
      return props.text.toLocaleString();
    } else if (props.text instanceof Date) {
      if (!props.text || props.text.getFullYear() <= 1) {
        return "-";
      }

      return formatDate(props.text);
    } else if (typeof props.text === "boolean") {
      return props.text ? "Yes" : "No";
    } else {
      return props.text;
    }
  }, [props.text, props.children]);

  if (props.hideEmpty && !content) {
    return <></>;
  }

  return (
    <Typography type="p" className="mb-1 last:mb-0" noMargin>
      <Typography type="label" bold className="mr-2" noMargin>
        {props.label}:
      </Typography>
      {content}
    </Typography>
  );
}
