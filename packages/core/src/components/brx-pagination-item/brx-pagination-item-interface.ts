const SpecialTokens = ['first', 'prev', 'next', 'last'] as const;

export type ISpecialToken = typeof SpecialTokens[number];

export type IPaginationItemTarget = ISpecialToken | number;

export const isSpecialToken = (value: any): value is ISpecialToken => {
  return SpecialTokens.includes(value as any);
};

export const parseTarget = (target: any) => {
  if (isSpecialToken(target)) {
    return target;
  }

  return parseInt(String(target));
};
