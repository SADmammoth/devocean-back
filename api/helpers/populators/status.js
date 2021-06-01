module.exports = {
  friendlyName: 'Populate status',

  description: '',

  inputs: {
    id: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ id }) {
    const status = await Status.findOne({ id });
    return status;
  },
};
