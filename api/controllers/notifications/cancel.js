module.exports = {
  friendlyName: 'Notification',

  description: 'Cancel notification',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
  },

  exits: {},

  fn: async function ({ id }) {
    const notification = await Notification.updateOne(
      { id },
      {
        status: 'cancelled',
      }
    );

    return notification;
  },
};
