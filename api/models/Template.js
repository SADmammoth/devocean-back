module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    fields: {
      type: 'json',
      required: true,
    },
  },
};
