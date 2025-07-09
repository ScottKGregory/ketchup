import { animated, config, useTransition } from "@react-spring/web";
import { useToast } from "../hooks/toast";
import { createPortal } from "react-dom";
import { useMemo } from "react";

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
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10" />
      </svg>
      <span className="sr-only">{props.level} icon</span>
    </div>
  );

  switch (props.level) {
    case "success":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
      break;
    case "warning":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
      break;
    case "error":
      icon = (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">{props.level} icon</span>
        </div>
      );
  }
  return (
    <div
      className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow-md"
      role="alert"
    >
      {icon}
      <div className="ms-3 text-sm font-normal">{props.message}</div>
      {props.onClose && (
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
          aria-label="Close"
          onClick={props.onClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
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
