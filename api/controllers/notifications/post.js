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
    await sails.helpers.actions.postNotifications(
      title,
      time,
      teammateId,
      fullText,
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
  },
};
