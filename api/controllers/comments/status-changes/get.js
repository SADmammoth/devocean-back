module.exports = {
  friendlyName: 'Comment',

  description: 'Get status changes.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const statusChanges = await StatusChange.find({ task: id }).populate(
      'author'
    );
    return await Promise.all(
      statusChanges.map(async (change) => {
        const fromStatus = await Status.findOne({
          id: change.fromStatus,
        });
        const toStatus = await Status.findOne({ id: change.toStatus });
        return { ...change, fromStatus, toStatus };
      })
    );
  },
};
