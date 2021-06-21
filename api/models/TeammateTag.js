module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    teammates: {
      collection: 'teammate',
      via: 'tags',
    },
    workspaceId: { type: 'string' },
  },
};
