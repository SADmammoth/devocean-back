module.exports = {
  friendlyName: 'Get tasks of tag',

  description: 'Get tasks of tag',

  inputs: {
    tagId: { type: 'string', required: true },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tasks of tag',
    },
  },

  fn: async function ({ tagId }) {
    const tag = await Tag.findOne({ id: tagId }).populate('lists');

    if (tag) {
      let list;
      const tasks = await Promise.all(
        tag.lists.map(async ({ id }) => {
          list = await TaskCollection({ id }).populate('tasks');
          return list.tasks;
        })
      );
      return tasks.flat();
    }
  },
};
