module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    author: {
      model: 'teammate',
      //TODO required
    },
    contributors: {
      collection: 'teammate',
    },
    content: {
      type: 'ref',
      required: true,
    },
    createdAt: {
      type: 'number',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
    },
  },
};
