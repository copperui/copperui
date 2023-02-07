const TOKEN_UNCONTROLLED = null;
const isControlled = (value) => value !== TOKEN_UNCONTROLLED;
const getControlledValue = (controlledValue, value, defaultValue) => (isControlled(controlledValue) ? controlledValue : value !== null && value !== void 0 ? value : defaultValue);

export { TOKEN_UNCONTROLLED as T, getControlledValue as g, isControlled as i };
