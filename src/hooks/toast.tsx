import React, {
  useState,
  useContext,
  useCallback,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import {
  ToastContainer,
  type ToastLevel,
  type ToastData,
} from "../components/toast";

interface toastHook {
  addToast: (level: ToastLevel, content: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<toastHook>({
  addToast: () => {},
  removeToast: () => {},
});

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
    (id: string) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts],
  );

  const addToast = useCallback(
    (level: ToastLevel, content: string) => {
      setToasts((toasts) => [
        ...toasts,
        { id: crypto.randomUUID(), level, content },
      ]);
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
  const toastHelpers = useRef(useContext(ToastContext));

  return toastHelpers.current;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ToastContext, useToast };
export default ToastProvider;
