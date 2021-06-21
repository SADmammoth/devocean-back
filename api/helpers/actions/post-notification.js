module.exports = {
  friendlyName: 'Notification',

  description: 'Post notifications.',

  inputs: {
    title: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    time: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    author: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    fullText: { type: 'string', meta: { swagger: { in: 'body' } } },
    authorization: { type: 'string' },
  },

  exits: {},

  fn: async function ({ title, time, author, fullText, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(authorization);

    const notification = await Notification.create({
      title,
      time: time ? new Date(time) : new Date(),
      author,
      fullText,
      workspaceId,
    }).fetch();
    return notification;
  },
};
