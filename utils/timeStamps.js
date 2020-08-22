const moment = require("moment");

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_MONTH = 30 * ONE_DAY;

const currentUTC = () => moment.utc().format("YYYY-MM-DD HH:mm:ss");

const localTOUTC = (date) => moment.utc(date).format("YYYY-MM-DD HH:mm:ss");

const UTCToLocal = (date) => {
  const localTime = moment.utc(date).toDate();
  return moment(localTime).format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
  localTOUTC,
  UTCToLocal,
  currentUTC
};
