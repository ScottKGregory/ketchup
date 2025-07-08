import React, {
  useState,
  useContext,
  useCallback,
  type PropsWithChildren,
  useEffect,
} from "react";
import {
  ToastContainer,
  type ToastLevel,
  type ToastData,
} from "../components/toast";

interface toastHook {
  addToast: (level: ToastLevel, content: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = React.createContext<toastHook>({
  addToast: () => {},
  removeToast: () => {},
});

let id = 1;

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        5000,
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const removeToast = useCallback(
    (id: number) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts],
  );

  const addToast = useCallback(
    (level: ToastLevel, content: string) => {
      setToasts((toasts) => [...toasts, { id: id++, level, content }]);
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ToastContext, useToast };
export default ToastProvider;
