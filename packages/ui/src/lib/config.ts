export const config = {
  // the backend base url
  hostUrl:
    process.env.NODE_ENV === "production"
      ? "https://waitinglyne.org"
      : "http://localhost:5000",
  // frontend base url
  frontendUrl:
    process.env.NODE_ENV === "production"
      ? "https://waitinglyne.org"
      : "http://localhost:3000",
};
