export const generateUniqueId = async (): Promise<string> => {
  const { nanoid } = await import('nanoid');
  return `gid_${nanoid()}`;
};
