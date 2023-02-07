export const TOKEN_UNCONTROLLED = null;
export type TOKEN_UNCONTROLLED = null;

export const isControlled = (value: any) => value !== TOKEN_UNCONTROLLED;

export const getControlledValue = (controlledValue: any, value: any, defaultValue: any) => (isControlled(controlledValue) ? controlledValue : value ?? defaultValue);
