module.exports = {
  friendlyName: 'Depopulate notifications authors',

  description: '',

  inputs: {
    notifications: { type: 'ref', required: true },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ notifications }) {
    const newNotifications = notifications.map(
      ({ author: { id, name, lastName }, ...rest }) => {
        return { ...rest, author: { id, name, lastName } };
      }
    );

    return newNotifications;
  },
};
