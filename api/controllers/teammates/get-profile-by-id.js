module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammate profile by id.',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ id, authorization }) {
    const teammate = await Teammate.findOne({ id })
      .populate('subteams')
      .populate('tags');

    return await sails.helpers.populators.teammateFullProfile(
      teammate,
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
  },
};
