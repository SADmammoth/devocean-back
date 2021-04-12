module.exports = {
  friendlyName: 'Notification',

  description: 'Get notifications',

  inputs: {
    teammateId: { type: 'string', meta: { swagger: { in: 'query' } } },
  },

  exits: {},

  fn: async function ({ teammateId }) {
    let select = ['id', 'title', 'time', 'author'];
    if (teammateId) {
      select = ['id', 'title', 'time'];
    }
    const notifications = await Notification.find({
      where: { author: teammateId },
      select,
    });
    return notifications;
  },
};
