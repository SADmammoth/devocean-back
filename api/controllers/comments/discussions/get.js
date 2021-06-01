module.exports = {
  friendlyName: 'Comment',

  description: 'Get discussions.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const discussions = await Discussions.find({ task: id }).populate('author');

    return discussions;
  },
};
