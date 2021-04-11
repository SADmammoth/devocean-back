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
    const tag = await Tag.findOne({ id: tagId }).populate('tasks');

    if (tag) {
      return tag.tasks;
    }
  },
};
