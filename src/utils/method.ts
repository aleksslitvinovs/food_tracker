export const objectEmpty = (obj: Object | undefined): boolean => {
  if (obj === undefined) {
    return true;
  }

  return Object.keys(obj).length === 0;
};
