const _ = require('@sailshq/lodash');
const request = require('superagent');
const prefix = require('superagent-prefix');
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

sails.on('notification:updated', async ({ changes: model }) => {
  const response = await request
    .get('/notifications/notify')
    .use(prefix(sails.config.custom.subscriptionServer));
});

sails.on('notification:created', async (model) => {
  const response = await request
    .get('/notifications/notify')
    .use(prefix(sails.config.custom.subscriptionServer));
});
