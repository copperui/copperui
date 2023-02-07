const SpecialTokens = ['first', 'prev', 'next', 'last'];
const isSpecialToken = (value) => {
  return SpecialTokens.includes(value);
};
const parseTarget = (target) => {
  if (isSpecialToken(target)) {
    return target;
  }
  return parseInt(String(target));
};

export { isSpecialToken as i, parseTarget as p };
