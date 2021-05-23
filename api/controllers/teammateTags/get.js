module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Get teammate tags.',

  inputs: {
    id: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id }) {
    return (await Teammate.findOne({ id }).populate('tags')).tags;
  },
};
