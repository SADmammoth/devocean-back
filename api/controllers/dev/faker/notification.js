const _ = require('@sailshq/lodash');
const priorityEnum = require('../../../types/enums/priority');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {
    count: {
      type: 'number',
      defaultsTo: 1,
    },
    title: {
      type: 'string',
    },
    time: { type: 'string' },
    author: {
      type: 'string',
    },
    fullText: { type: 'string' },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ count, title, time, author, fullText, authorization }) {
    let notification;
    const notifications = await Promise.all(
      new Array(count).fill(0).map(async () => {
        notification = {
          title: title || sails.helpers.faker.title(),
          time: time || sails.helpers.faker.dateInFuture(),
          author:
            author || (await sails.helpers.faker.randomRecord(Teammate)).id,
          fullText: fullText || sails.helpers.faker.text(),
          authorization,
        };

        return await sails.helpers.actions.postNotification.with(notification);
      }),
    );

    return notifications;
  },
};
