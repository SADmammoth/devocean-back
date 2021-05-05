const DateType = require('./Date');

module.exports = {
  ...DateType,
  isBefore: new Date(Date.now() + 3600000),
};
