const _ = require('@sailshq/lodash');

const referAs = require('../types/enums/referAs');

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    referAs: { type: 'string', isIn: referAs, required: true },
    createdNotifications: { collection: 'notification', via: 'author' },
    assignedTasks: { collection: 'assignee', via: 'teammate' },
  },
};
