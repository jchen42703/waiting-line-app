const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
const oneWeek = 7 * oneDay;

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

export { oneSecond, oneMinute, oneHour, oneDay, oneWeek };
