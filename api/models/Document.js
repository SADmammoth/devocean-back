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
    abstract: {
      type: 'string',
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
    workspaceId: {
      type: 'string',
    },
  },
};
