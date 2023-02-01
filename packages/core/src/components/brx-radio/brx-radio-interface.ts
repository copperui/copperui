export interface RadioChangeEventDetail<T = string> {
  value: T;
  checked: boolean;
}

export interface RadioUpdateEventDetail<T = string> {
  value: T;
  checked: boolean;
}
