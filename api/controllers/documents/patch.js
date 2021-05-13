module.exports = {
  friendlyName: 'Document',

  description: 'Patch documents.',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'ref',
    },
    abstract: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({ id, content, abstract, title, authorization }) {
    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    await Document.addToCollection(id, 'contributors').members([teammateId]);

    return await Document.updateOne(
      { id },
      {
        content,
        abstract,
        title,
      },
    );
  },
};
