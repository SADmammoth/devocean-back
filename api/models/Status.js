module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    tasks: { collection: 'task', via: 'status' },
    workspaceId: {
      type: 'string',
    },
  },
};
