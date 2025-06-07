import { toast, ToastOptions, Theme, ToastPosition, UpdateOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const defaultOptions = {
  position: 'top-right' as const,
  theme: 'light' as const,
};

export const showToast = (message: string, type: ToastType, id?: string, position?: ToastPosition, theme: Theme = 'light') => {
    if (type === 'success') {
        toast.success(message, { theme: theme || 'dark', position: position || "top-right", toastId: id })
    }
    if (type === 'error') {
        toast.error(message, { theme: theme || 'dark', position: position || "top-right", toastId: id })
    }
    if (type === 'info') {
        toast.info(message, { theme: theme || 'dark', position: position || "top-right", toastId: id })
    }
    if (type === 'warning') {
        toast.warning(message, { theme: theme || 'dark', position: position || "top-right", toastId: id })
    }
}

export const updateToast = (
  id: string,
  message: string,
  type: ToastType,
  theme: Theme = 'light'
) => {
  toast.update(id, {
    render: message,
    type,
    theme,
    isLoading: false,
    autoClose: 3000,
  });
};

export function toastWithPromise<T>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string | UpdateOptions<T> | undefined;
    error: string | UpdateOptions<unknown> | undefined;
  },
  options?: ToastOptions<T>
): Promise<T> {
  return toast.promise<T, unknown, string>(
    promise,
    {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    },
    {
      ...defaultOptions,
      ...options,
    } as ToastOptions<T>
  );
}
