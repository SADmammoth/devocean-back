module.exports = {
  friendlyName: 'Teammate full profile',

  description: '',

  inputs: {
    teammate: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammate }) {
    return teammate;
  },
};
