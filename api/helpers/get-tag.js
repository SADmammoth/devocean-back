module.exports = {
  friendlyName: 'Get tag',

  description: '',

  inputs: {
    tagInput: {
      type: 'ref',
      description: 'Tag id or tag object',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tag',
    },
  },

  fn: async function ({ tagInput }) {
    let tag;

    if (typeof tagInput === 'string') {
      tag = await Tag.findOne({ id: tagInput });
    } else if (tagInput.color && tagInput.name) {
      tag = await Tag.create({ ...tagInput }).fetch();
    } else {
      return null;
    }

    return tag;
  },
};
