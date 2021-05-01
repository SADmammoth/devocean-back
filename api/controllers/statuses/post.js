module.exports = {
  friendlyName: 'Status',

  description: 'Post statuses.',

  inputs: {
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
  },

  exits: {},

  fn: async function ({ name }) {
    const status = await Status.create({ name }).fetch();

    return status;
  },
};
