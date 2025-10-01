import classNames from "classnames";
import { useState, type ReactElement, type ReactNode } from "react";
import { TextAlignment, type Alignment } from "../helpers/classes";
import Typography from "./typography";
import Card from "./card";
import Modal, { type Props as ModalProps } from "./modal";
import formatDate from "../helpers/dates";

interface WithID {
  id?: string | number;
}

interface Column<T extends WithID> {
  heading: ReactElement | string;
  key: keyof T;
  render?: (val: T) => ReactElement;
  boolConvert?: (b: boolean) => string;
  align?: Alignment;
}

export interface Props<T extends WithID> {
  caption?: ReactElement;
  footer?: ReactElement;
  leftHeading?: boolean;

  data: T[];
  columns: (Column<T> | null)[];

  onRowClick?: (val: T) => void;
  modal?: (val: T) => ModalProps;
  expand?: (val: T) => ReactNode;
}

const cellClasses = classNames("px-4 py-2 border-b dark:border-gray-700");
const boolToString = (b: boolean): string => {
  return b ? "yes" : "no";
};

function getData<T extends WithID>(val: T, col: Column<T>) {
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

export default function Table<T extends WithID>(props: Props<T>) {
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
                  key={String(col.key)}
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
            <Row key={`row-${val.id}`} {...props} val={val} />
          ))}
        </tbody>
        {props.footer && <tfoot>{props.footer}</tfoot>}
      </table>

      <div className="flex flex-col gap-2 md:hidden">
        {props.data.map((val) => (
          <Row key={`card-${val.id}`} {...props} val={val} card />
        ))}

        {props.footer && <tfoot>{props.footer}</tfoot>}
      </div>
    </>
  );
}

interface RowProps<T extends WithID> {
  val: T;
  leftHeading?: boolean;
  columns: (Column<T> | null)[];
  onRowClick?: (val: T) => void;
  modal?: (val: T) => ModalProps;
  expand?: (val: T) => ReactNode;
  card?: boolean;
}

function Row<T extends WithID>(props: RowProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowOpen, setRowOpen] = useState(false);

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

  const openRow = rowOpen && !!props.expand && (
    <tr>
      <td colSpan={props.columns.length}>
        <Card
          className={classNames({
            "mb-2 rounded-none border-t": !props.card,
            "mt-2": props.card,
          })}
          level="tertiary"
        >
          {props.expand(props.val)}
        </Card>
      </td>
    </tr>
  );

  const onClick = () => {
    if (props.expand) {
      setRowOpen((o) => !o);
    }

    if (props.modal) {
      setModalOpen(true);
    }

    if (props.onRowClick) {
      props.onRowClick!(props.val);
    }
  };

  if (props.card) {
    return (
      <Card level="secondary" onClick={onClick}>
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
          {openRow}
        </div>
      </Card>
    );
  }

  return (
    <>
      <tr
        key={props.val.id}
        className={classNames("hover:bg-gray-100 dark:hover:bg-gray-800", {
          "hover:cursor-pointer": !!props.onRowClick || !!props.modal,
          "bg-gray-100 shadow-lg dark:bg-gray-700": rowOpen,
        })}
        onClick={onClick}
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
      {openRow}
    </>
  );
}
