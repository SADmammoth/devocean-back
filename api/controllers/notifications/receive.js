module.exports = {
  friendlyName: 'Notification',

  description: 'Get sent or cancelled notifications',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const notifications = await Notification.find({
      or: [
        {
          time: {
            '<=': new Date(),
          },
          workspaceId,
        },
        {
          status: 'sent',
          workspaceId,
        },
        {
          status: 'cancelled',
          workspaceId,
        },
      ],
    }).populate('author');

    if (!notifications) {
      return [];
    }

    await Promise.all(
      notifications.map(async (notification) => {
        const { id, status } = notification;
        if (!status || status === 'delayed') {
          return await Notification.updateOne({ id }, { status: 'sent' });
        }
        return notification;
      }),
    );

    return notifications;
  },
};
