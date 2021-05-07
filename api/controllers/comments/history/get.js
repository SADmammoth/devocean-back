module.exports = {
  friendlyName: 'Comment',

  description: 'Get history.',

  inputs: {
    id: {
      type: 'string',
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const history = await History.find({
      where: { task: id },
      omit: ['updatedAt', 'createdAt'],
    }).populate('author');

    return await Promise.all(
      history.map(async ({ before, after, ...rest }) => {
        return {
          before: !before || (await sails.helpers.populators.history(before)),
          after: await sails.helpers.populators.history(after),
          ...rest,
        };
      })
    );
  },
};
