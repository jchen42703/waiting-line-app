// NODE_ENV=production REACT_APP_NODE_ENV=production yarn start
export const config = {
  // the backend base url
  hostUrl:
    process.env.REACT_APP_NODE_ENV === "production"
      ? "https://waitinglyne.org"
      : "http://localhost:5000",
  // frontend base url
  frontendUrl:
    process.env.REACT_APP_NODE_ENV === "production"
      ? "https://waitinglyne.org"
      : "http://localhost:3000",
};
