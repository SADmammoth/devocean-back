module.exports = {
  friendlyName: 'Comment',

  description: 'Post discussions.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    text: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, text, authorization }) {
    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    const discussion = await Discussions.create({
      task: id,
      text,
      author: teammateId,
    }).fetch();

    return discussion;
  },
};
