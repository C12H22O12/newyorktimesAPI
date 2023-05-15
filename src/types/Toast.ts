export type success = string;

export type error = string;

export type ToastType = {
  isToast: boolean;
  type: success | error;
  contentHeader: string;
  contentBody: string;
};
