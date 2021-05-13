module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates profiles.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function () {
    const teammates = await Teammate.find().populate('subteams', 'tags');

    return await sails.helpers.populators.teammatesProfilesCollection(
      teammates,
    );
  },
};
