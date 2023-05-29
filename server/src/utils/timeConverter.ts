export const convertTime = (time: number) => {
  return time.toFixed(1);
};
export const convertPoint = (time: number) => {
  return Number((2 ** (time / 10)).toFixed(2));
};
