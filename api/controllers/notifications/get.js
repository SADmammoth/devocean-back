module.exports = {
  friendlyName: 'Notification',

  description: 'Get notifications',

  inputs: {
    teammateId: { type: 'string', meta: { swagger: { in: 'query' } } },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ teammateId, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    let select = ['id', 'title', 'time', 'author'];
    if (teammateId) {
      select = ['id', 'title', 'time'];
    }

    const notifications = await Notification.find({
      where: { author: teammateId, workspaceId },
      sort: [{ time: 'DESC' }],
    }).populate('author');

    if (!notifications) {
      return [];
    }

    return await sails.helpers.depopulateNotificationsAuthors(notifications);
  },
};
