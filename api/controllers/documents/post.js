module.exports = {
  friendlyName: 'Document',

  description: 'Post documents.',

  inputs: {
    content: {
      type: 'ref',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    author: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    title: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ content, author, title }) {
    const documents = await Document.create({
      content,
      author,
      title,
    }).fetch();
    return documents;
  },
};
