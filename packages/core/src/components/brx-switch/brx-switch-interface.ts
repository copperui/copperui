export interface SwitchChangeEventDetail<T = string> {
  value: T;
  checked: boolean;
  indeterminate: boolean;
}

export interface SwitchUpdateEventDetail<T = string> {
  value: T;
  checked: boolean;
  indeterminate: boolean;
}
