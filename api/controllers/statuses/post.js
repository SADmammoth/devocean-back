module.exports = {
  friendlyName: 'Status',

  description: 'Post statuses.',

  inputs: {
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },

    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ name, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const status = await Status.create({ name, workspaceId }).fetch();

    return status;
  },
};
