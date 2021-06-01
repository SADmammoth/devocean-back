module.exports = {
  friendlyName: 'Find list parent',

  description: '',

  inputs: {
    folder: {
      type: 'string',
      defaultsTo: 'sails.config.custom.rootFolderName',
    },
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

    if (parent.type === 'list') {
      return null;
    }

    return parent;
  },
};
