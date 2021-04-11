module.exports = {
  friendlyName: 'Get tag',

  description: '',

  inputs: {
    tagInput: {
      type: 'ref',
      description: 'Tag id or tag object',
      required: true,
    },
    tasks: { type: 'ref', description: 'Array of tasks, added to tag' },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tag',
    },
  },

  fn: async function ({ tagInput, tasks }) {
    let tag;

    if (typeof tagInput === 'string') {
      tag = await Tag.updateOne({ id: tagInput }, { tasks }).fetch();
    } else if (tagInput.color && tagInput.name) {
      tag = await Tag.create({ ...tagInput, tasks }).fetch();
    } else {
      return null;
    }

    return tag;
  },
};
