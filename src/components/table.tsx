import classNames from "classnames";
import dayjs from "dayjs";
import type { ReactElement, ReactNode } from "react";
import { TextAlignment, type Alignment } from "../helpers/classes";
import Typography from "./typography";

interface Column<T extends object> {
  heading: ReactElement | string;
  key: keyof T;
  render?: (val: T) => ReactElement;
  boolConvert?: (b: boolean) => string;
  align?: Alignment;
}

interface Props<T extends object> {
  caption?: ReactElement;
  footer?: ReactElement;
  leftHeading?: boolean;

  data: T[];
  columns: Column<T>[];

  onRowClick?: (val: T) => void;
}

const cellClasses = classNames("px-4 py-2 border-b dark:border-gray-700");

export default function Table<T extends object>(props: Props<T>) {
  const boolToString = (b: boolean): string => {
    return b ? "yes" : "no";
  };

  const renderColumn = (val: T, col: Column<T>) => {
    let ret;
    if (col.render) {
      ret = col.render(val);
    } else {
      const v = val[col.key];
      switch (typeof v) {
        case "string":
          ret = v;
          break;
        case "number":
        case "bigint":
          ret = v;
          break;
        case "boolean":
          if (col.boolConvert) {
            ret = col.boolConvert(v as boolean);
          } else {
            ret = boolToString(v as boolean);
          }
          break;
        case "undefined":
          ret = "";
          break;
        case "object":
          ret = JSON.stringify(v);
          break;
      }

      if (v instanceof Date) {
        ret = dayjs(v).format("MMM D, YYYY h:mm A");
      }
    }

    const classes = classNames(TextAlignment(col.align), cellClasses);
    return props.leftHeading ? (
      <th scope="row" className={classes}>
        <Typography type="span">{ret as ReactNode}</Typography>
      </th>
    ) : (
      <td className={classes}>
        <Typography type="span">{ret as ReactNode}</Typography>
      </td>
    );
  };

  return (
    <table className="w-full">
      {props.caption && <caption>{props.caption}</caption>}
      <thead>
        <tr>
          {props.columns.map((col) => (
            <th
              scope="col"
              className={classNames(TextAlignment(col.align), cellClasses)}
            >
              <Typography type="span">{col.heading}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((val) => (
          <tr
            className={classNames("hover:bg-gray-100 hover:dark:bg-gray-800", {
              "hover:cursor-pointer": !!props.onRowClick,
            })}
            onClick={
              props.onRowClick ? () => props.onRowClick!(val) : undefined
            }
          >
            {props.columns.map((col) => renderColumn(val, col))}
          </tr>
        ))}
      </tbody>
      {props.footer && <tfoot>{props.footer}</tfoot>}
    </table>
  );
}
