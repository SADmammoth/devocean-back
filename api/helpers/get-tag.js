module.exports = {
  friendlyName: 'Get tag',

  description: '',

  inputs: {
    tagInput: {
      type: 'ref',
      description: 'Tag id or tag object',
      required: true,
    },
    workspaceId: {
      type: 'string',
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tag',
    },
  },

  fn: async function ({ tagInput, workspaceId }) {
    let tag;

    if (typeof tagInput === 'string') {
      tag = await Tag.findOne({ id: tagInput, workspaceId });
    } else if (tagInput.color && tagInput.name) {
      tag = await Tag.create({ ...tagInput, workspaceId }).fetch();
    } else {
      return null;
    }

    return tag;
  },
};
