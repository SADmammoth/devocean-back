module.exports = {
  friendlyName: 'Notification',

  description: 'Get full notification content by id',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
  },

  exits: {},

  fn: async function ({ id }) {
    const notification = await Notification.findOne({ id });
    return notification;
  },
};
