export interface CheckboxChangeEventDetail<T = string> {
  value: T;
  checked: boolean;
  indeterminate: boolean;
}

export interface CheckboxUpdateEventDetail<T = string> {
  value: T;
  checked: boolean;
  indeterminate: boolean;
}
