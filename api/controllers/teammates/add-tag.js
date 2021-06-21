module.exports = {
  friendlyName: 'Teammate',

  description: 'Add tag to teammate.',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    tag: {
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

  fn: async function ({ id, tag, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const foundTag = await TeammateTag.findOne({
      or: [
        {
          id: tag,
          workspaceId,
        },
        {
          name: tag,
          workspaceId,
        },
      ],
    });

    await Teammate.addToCollection(id, 'tags').members([foundTag.id]);
  },
};
