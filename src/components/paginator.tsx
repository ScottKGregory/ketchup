import type { PropsWithChildren } from "react";
import Button from "./button";
import classNames from "classnames";
import Typography from "./typography";

interface Props extends PropsWithChildren {
  top?: boolean;
  bottom?: boolean;

  onNext?: () => void;
  onPrev?: () => void;

  label: string;
  count: number;
  start: number;
  end: number;
}

export default function Paginator(props: Props) {
  let end = props.end;
  if (props.end > props.count) {
    end = props.count;
  }

  const pag = (className?: string) => (
    <div
      className={classNames(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      <Button
        text="Prev"
        onClick={props.onPrev}
        disabled={!props.onPrev || props.start === 0}
      />

      <Typography type="span" className="text-sm">
        {" "}
        Showing{" "}
        <Typography type="span" bold>
          {" "}
          {props.start}{" "}
        </Typography>{" "}
        to{" "}
        <Typography type="span" bold>
          {" "}
          {end}{" "}
        </Typography>{" "}
        of{" "}
        <Typography type="span" bold>
          {" "}
          {props.count}{" "}
        </Typography>{" "}
        {props.label}{" "}
      </Typography>

      <Button
        text="Next"
        onClick={props.onNext}
        disabled={!props.onNext || end === props.count}
      />
    </div>
  );

  if (!props.children) {
    return pag();
  }

  return (
    <>
      {(props.top === undefined || props.top === true) && pag("pb-8")}
      {props.children}
      {(props.bottom === undefined || props.bottom === true) && pag("pt-8")}
    </>
  );
}
