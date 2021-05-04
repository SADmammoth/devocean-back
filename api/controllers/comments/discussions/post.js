module.exports = {
  friendlyName: 'Comment',

  description: 'Post discussions.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    time: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    author: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    text: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ id, author, time, text }) {
    const discussion = await Discussions.create({
      task: id,
      time,
      text,
      author,
    }).fetch();

    return discussion;
  },
};
