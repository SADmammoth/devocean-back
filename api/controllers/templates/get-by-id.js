module.exports = {
  friendlyName: 'Template',

  description: '',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
  },

  exits: {},

  fn: async function ({ id }) {
    const template = await Template.findOne({ id });

    return template;
  },
};
