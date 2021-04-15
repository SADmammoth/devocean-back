const _ = require('@sailshq/lodash');
const Date = require('../types/Date');
const notificationStatuses = require('../types/enums/notificationStatuses');

module.exports = {
  attributes: {
    title: { type: 'string', required: true },
    time: {
      ...Date,
      required: true,
    },
    author: { model: 'teammate' },
    fullText: { type: 'string' },
    status: {
      type: 'string',
      isIn: notificationStatuses,
    },
  },
};
