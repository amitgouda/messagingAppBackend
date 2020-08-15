const { DATABASE } = require("./index");

module.exports = {
  DATABASE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
