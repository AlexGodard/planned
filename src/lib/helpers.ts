export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(void 0), ms));
