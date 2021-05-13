module.exports = {
  friendlyName: 'Populate history',

  description: '',

  inputs: {
    history: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ history }) {
    const { status, timeInStatus, ...rest } = history;
    return {
      status: status
        ? (await sails.helpers.populators.status(status.toString())).name
        : undefined,
      ...rest,
    };
  },
};
