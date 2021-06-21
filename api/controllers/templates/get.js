module.exports = {
  friendlyName: 'Template',

  description: 'Get templates.',

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
    const templates = await Template.find({ workspaceId });
    return templates.map(({ id, name }) => ({ id, name }));
  },
};
