module.exports = {
  friendlyName: 'Notification',

  description: 'Update fields and delay notification',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
    title: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    time: { type: 'string', meta: { swagger: { in: 'body' } } },
    fullText: { type: 'string', meta: { swagger: { in: 'body' } } },
  },

  exits: {
    success: {},
    notFound: {
      responseType: 'notFound',
    },
    badRequest: { responseType: 'badRequest' },
  },

  fn: async function ({ id, title, time, fullText }) {
    const notification = await Notification.findOne({ id });

    if (!notification) {
      throw 'notFound';
    }

    let status = notification.status;
    if (new Date(time) < new Date()) {
      throw {
        badRequest: {
          message: 'Unable set notification time to past',
        },
      };
    }

    if (
      new Date(notification.time) <= new Date() ||
      status === 'send' ||
      status === 'cancelled'
    ) {
      status = 'delayed';
      if (!time) time = new Date();
    }

    const newNotification = await Notification.updateOne(
      { id },
      {
        title,
        time,
        fullText,
        status,
      },
    );

    return newNotification;
  },
};
