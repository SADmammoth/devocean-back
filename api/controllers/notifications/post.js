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
  },

  exits: {},

  fn: async function ({ title, time, fullText }) {
    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    const notification = await Notification.create({
      title,
      time: time ? new Date(time) : new Date(),
      author: teammateId,
      fullText,
    }).fetch();
    return notification;
  },
};
