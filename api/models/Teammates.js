const _ = require('@sailshq/lodash');

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    referAs: { type: 'string', required: true },
    createdNotifications: { collection: 'notifications', via: 'author' },
  },
};
