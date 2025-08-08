import classNames from "classnames";
import { useState, type ReactElement, type ReactNode } from "react";
import { TextAlignment, type Alignment } from "../helpers/classes";
import Typography from "./typography";
import Card from "./card";
import Modal, { type Props as ModalProps } from "./modal";
import formatDate from "../helpers/dates";

interface Column<T extends object> {
  heading: ReactElement | string;
  key: keyof T;
  render?: (val: T) => ReactElement;
  boolConvert?: (b: boolean) => string;
  align?: Alignment;
}

export interface Props<T extends object> {
  caption?: ReactElement;
  footer?: ReactElement;
  leftHeading?: boolean;

  data: T[];
  columns: (Column<T> | null)[];

  onRowClick?: (val: T) => void;
  modal?: (val: T) => ModalProps;
}

const cellClasses = classNames("px-4 py-2 border-b dark:border-gray-700");
const boolToString = (b: boolean): string => {
  return b ? "yes" : "no";
};

function getData<T extends object>(val: T, col: Column<T>) {
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

    if (!v) {
      return "-";
    }

    if (v instanceof Date) {
      ret = formatDate(v);
    }
  }

  return ret;
}

export default function Table<T extends object>(props: Props<T>) {
  return (
    <>
      <table className="hidden w-full md:table">
        {props.caption && <caption>{props.caption}</caption>}
        <thead>
          <tr>
            {props.columns
              .filter((c) => c !== null)
              .map((col) => (
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
            <Row {...props} val={val} />
          ))}
        </tbody>
        {props.footer && <tfoot>{props.footer}</tfoot>}
      </table>

      <div className="flex flex-col gap-2 md:hidden">
        {props.data.map((val) => (
          <Row {...props} val={val} card />
        ))}

        {props.footer && <tfoot>{props.footer}</tfoot>}
      </div>
    </>
  );
}

interface RowProps<T extends object> {
  val: T;
  leftHeading?: boolean;
  columns: (Column<T> | null)[];
  onRowClick?: (val: T) => void;
  modal?: (val: T) => ModalProps;
  card?: boolean;
}

function Row<T extends object>(props: RowProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);

  const renderColumn = (val: T, col: Column<T>) => {
    const classes = classNames(TextAlignment(col.align), cellClasses);
    const ret = getData(val, col);
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

  if (props.card) {
    return (
      <Card
        level="secondary"
        onClick={() => {
          if (props.modal) {
            setModalOpen(true);
          }

          if (props.onRowClick) {
            props.onRowClick!(props.val);
          }
        }}
      >
        <div className="flex flex-col">
          {props.columns
            .filter((c) => c !== null)
            .map((col) => (
              <>
                <Typography className="mb-0 inline-flex w-full justify-between gap-2">
                  <Typography type="label" bold>
                    {col.heading}
                  </Typography>
                  {getData(props.val, col)}
                </Typography>
              </>
            ))}
        </div>
      </Card>
    );
  }

  return (
    <tr
      className={classNames("hover:bg-gray-100 hover:dark:bg-gray-800", {
        "hover:cursor-pointer": !!props.onRowClick || !!props.modal,
      })}
      onClick={() => {
        if (props.modal) {
          setModalOpen(true);
        }

        if (props.onRowClick) {
          props.onRowClick!(props.val);
        }
      }}
    >
      {props.columns
        .filter((c) => c !== null)
        .map((col) => renderColumn(props.val, col))}
      {props.modal ? (
        <Modal
          {...props.modal(props.val)}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        ></Modal>
      ) : undefined}
    </tr>
  );
}
