module.exports = {
  friendlyName: 'Find list parent',

  description: '',

  inputs: {
    folder: {
      type: 'string',
      defaultsTo: 'sails.config.custom.rootFolderName',
    },
    workspaceId: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ folder, workspaceId }) {
    const parent = await TaskCollection.findOne({
      or: [
        { id: folder, workspaceId },
        { name: folder, workspaceId },
      ],
    });

    if (parent.type === 'list') {
      return null;
    }

    return parent;
  },
};
