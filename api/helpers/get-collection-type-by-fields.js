module.exports = {
  friendlyName: 'Check collection type ambiguity',

  sync: true,

  description: '',

  inputs: {
    tag: { type: 'json' },
    children: { type: 'ref' },
    tasks: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ tag, children, tasks }) {
    if ((tag && children) || (children && tasks)) {
      return false;
    }

    let typeByFields = 'unknown';

    if (tag || tasks) {
      typeByFields = 'list';
    }

    if (children) {
      typeByFields = 'folder';
    }

    return typeByFields;
  },
};
