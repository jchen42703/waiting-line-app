// Contains the global pool of connections for the db/cache
module.exports = {
  db: require("./mongodb")(),
};
