const _ = require('@sailshq/lodash');
const Date = require('../types/Date');

module.exports = {
  attributes: {
    teammate: { model: 'teammate', required: true },
    assignedDate: {
      ...Date,
      required: true,
    },
  },
};
