module.exports = {
  friendlyName: 'Find list parent',

  description: '',

  inputs: {
    folder: { type: 'string', defaultsTo: 'Root folder' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ folder }) {
    const parent = await TaskCollection.findOne({
      or: [{ id: folder }, { name: folder }],
    });
    const { type } = sails.helpers.populateListWithType(parent);

    if (type === 'list') {
      return null;
    }

    return parent;
  },
};
