module.exports = {
  friendlyName: 'Populate list with type',

  sync: true,

  inputs: {
    list: { type: 'ref', required: true },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ list }) {
    let type = 'folder';
    if (list.tag) {
      type = 'list';
    }
    const { id, ...fields } = list;
    return { id, type, ...fields };
  },
};
