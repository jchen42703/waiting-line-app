/**
 * Sleeps for `ms` milliseconds
 * @param ms
 * @returns
 */
export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));
