module.exports = {
  friendlyName: 'Document',

  description: 'Post documents.',

  inputs: {
    content: {
      type: 'ref',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    title: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    abstract: {
      type: 'string',
    },
    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({ content, title, authorization, abstract }) {
    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    const documents = await Document.create({
      content,
      author: teammateId,
      title,
      abstract,
    }).fetch();
    return documents;
  },
};
