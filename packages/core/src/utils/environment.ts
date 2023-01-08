export const getWindow = (): Window | null => window;

export const requestIdleCallbackPony = (callback: () => void, options?: IdleRequestOptions) => {
  const win = getWindow();

  if (win && 'requestIdleCallback' in win) {
    win.requestIdleCallback(callback, options);
  } else {
    setTimeout(callback, options?.timeout + 20);
  }
};
