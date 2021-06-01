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
    const isChildrenEmpty = children && children.length;
    const isTasksEmpty = tasks && tasks.length;
    if ((tag && isChildrenEmpty) || (isChildrenEmpty && isTasksEmpty)) {
      return false;
    }

    let typeByFields = 'unknown';

    if (tag || isTasksEmpty) {
      typeByFields = 'list';
    }

    if (isChildrenEmpty) {
      typeByFields = 'folder';
    }

    return typeByFields;
  },
};
