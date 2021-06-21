module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Get tags.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    return await TeammateTag.find({ workspaceId });
  },
};
