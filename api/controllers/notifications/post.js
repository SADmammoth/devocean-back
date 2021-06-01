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
    fullText: { type: 'string', meta: { swagger: { in: 'body' } } },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ title, time, fullText, authorization }) {
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
