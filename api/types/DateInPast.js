const DateType = require('./Date');

module.exports = {
  ...DateType,
  isBefore: new Date(),
};