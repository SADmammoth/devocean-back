module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    fields: {
      type: 'json',
      required: true,
    },
    workspaceId: {
      type: 'string',
    },
  },
};
