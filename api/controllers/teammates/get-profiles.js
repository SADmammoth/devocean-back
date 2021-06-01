module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates profiles.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ authorization }) {
    const teammates = await Teammate.find()
      .populate('subteams')
      .populate('tags');

    return await sails.helpers.populators.teammatesProfilesCollection(
      teammates,
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
  },
};
