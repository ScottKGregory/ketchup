import { animated, config, useTransition } from "@react-spring/web";
import { useToast } from "../hooks/toast";
import { createPortal } from "react-dom";
import { useMemo } from "react";
import Typography from "./typography";
import Icon from "./icon";

export type ToastLevel = "info" | "success" | "warning" | "error";

export interface ToastData {
  id: string;
  content: string;
  level: ToastLevel;
}

interface Props {
  level?: ToastLevel;
  message: string;
  onClose?: () => void;
}

export default function Toast(props: Props) {
  let icon = (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500">
      <Icon iconPrefix="fas" icon="info-circle" size="lg" />
      <span className="sr-only">{props.level} icon</span>
    </div>
  );

  switch (props.level) {
    case "success":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
          <Icon iconPrefix="fas" icon="check-circle" size="lg" />
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
      break;
    case "warning":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
          <Icon iconPrefix="fas" icon="circle-exclamation" size="lg" />
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
      break;
    case "error":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
          <Icon iconPrefix="fas" icon="circle-xmark" size="lg" />
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
  }
  return (
    <div
      className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
      role="alert"
    >
      {icon}
      <Typography type="span" className="ms-3 text-sm">
        {props.message}
      </Typography>
      {props.onClose && (
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
          aria-label="Close"
          onClick={props.onClose}
        >
          <span className="sr-only">Close</span>
          <Icon iconPrefix="fas" icon="xmark" />
        </button>
      )}
    </div>
  );
}

export const ToastContainer = ({ toasts }: { toasts: ToastData[] }) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const { removeToast } = useToast();

  const transitions = useTransition(toasts, {
    config: config.stiff,
    from: { x: -400, height: 0 },
    trail: 400 / toasts.length,
    enter: (item) => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({
        x: 0,
        height: refMap.get(item).offsetHeight,
      });
    },
    leave: (item) => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({
        x: -400,
        height: refMap.get(item).offsetHeight,
      });
    },
  });

  return createPortal(
    <div className="fixed bottom-0 left-0 z-10 flex w-96 flex-col gap-2 p-4">
      {transitions((style, t) => (
        <animated.div style={style}>
          <div
            ref={(ref: HTMLDivElement) => {
              refMap.set(t, ref);
            }}
          >
            <Toast
              key={t.id}
              message={t.content}
              level={t.level}
              onClose={() => removeToast(t.id)}
            />
          </div>
        </animated.div>
      ))}
    </div>,
    document.body,
  );
};
