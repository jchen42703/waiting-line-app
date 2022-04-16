/**
 * Sleeps for `ms` milliseconds
 * @param ms
 * @returns
 */
export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

export const getCurrentFormattedTime = () => {
  const currDate = new Date();
  return currDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
