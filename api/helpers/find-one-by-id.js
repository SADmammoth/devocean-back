module.exports = {
  friendlyName: 'Find one by id',

  description: '',

  inputs: {
    Model: { type: 'ref' },
    id: { type: 'string' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ Model, id }) {
    const array = await Model.find({ id }).limit(1);
    return array[0];
  },
};
