module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    teammates: {
      collection: 'teammate',
      via: 'tags',
    },
  },
};
