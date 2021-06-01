module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Get tags.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function () {
    return await TeammateTag.find();
  },
};
