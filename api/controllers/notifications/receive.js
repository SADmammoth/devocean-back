module.exports = {
  friendlyName: 'Notification',

  description: 'Get sent or cancelled notifications',

  inputs: {},

  exits: {},

  fn: async function () {
    const notifications = await Notification.find({
      or: [
        {
          time: {
            '<=': new Date(),
          },
        },
        {
          status: 'sent',
        },
        {
          status: 'cancelled',
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
      })
    );

    return notifications;
  },
};
