module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Post teammate tag.',

  inputs: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, name, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const tag = await TeammateTag.create({ name, workspaceId }).fetch();
    if (id) await Teammate.addToCollection(id, 'tags').members([tag.id]);
  },
};
