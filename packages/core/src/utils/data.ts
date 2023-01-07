export const tryParseJSON = (payload: any): any => {
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload);
    } catch (e) {}
  }

  return payload;
};
