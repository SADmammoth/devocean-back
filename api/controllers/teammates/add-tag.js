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

  fn: async function ({ id, tag }) {
    const foundTag = await TeammateTag.findOne({
      or: [
        {
          id: tag,
        },
        {
          name: tag,
        },
      ],
    });

    await Teammate.addToCollection(id, 'tags').members([foundTag.id]);
  },
};
