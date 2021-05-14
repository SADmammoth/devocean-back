module.exports = {
  friendlyName: 'Post',

  description: 'Post status changes.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    author: {
      type: 'string',
      // required: true,
      meta: { swagger: { in: 'body' } },
    },
    fromStatus: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    toStatus: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    text: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ id, time, author, fromStatus, toStatus, text }) {
    const statusChange = await StatusChange.create({
      task: id,
      author: (await Teammate.find({}))[0].id, // FIXME
      fromStatus,
      toStatus,
      text,
    }).fetch();

    return statusChange;
  },
};
