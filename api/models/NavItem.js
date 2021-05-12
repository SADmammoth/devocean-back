module.exports = {
  attributes: {
    label: {
      type: 'string',
      required: true,
      unique: true,
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
  },
};
