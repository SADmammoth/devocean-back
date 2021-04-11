module.exports = {
  friendlyName: 'Populate list with type',

  inputs: {
    list: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ list }) {
    let type = 'unknown';
    if (list.children && list.children.length) {
      type = 'folder';
    }
    if (list.tag) {
      type = 'list';
    }
    const { id, ...fields } = list;
    return { id, type, ...fields };
  },
};
