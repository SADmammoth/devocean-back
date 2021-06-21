module.exports = {
  attributes: {
    label: {
      type: 'string',
      required: true,
    },
    shortLabel: {
      type: 'string',
    },
    featureAccess: {
      type: 'string',
      defaultsTo: 'all',
    },
    link: {
      type: 'string',
      required: true,
    },
    onlyShort: {
      type: 'boolean',
      defaultsTo: false,
    },
    workspaceId: {
      type: 'string',
    },
  },
};
