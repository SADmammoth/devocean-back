module.exports = {
  friendlyName: 'Document',

  description: '',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const document = await Document.findOne({ id }).populate('contributors');
    return document;
  },
};
