const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Populate list',

  description: '',

  inputs: {
    list: { type: 'ref', required: true },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ list }) {
    let newList = sails.helpers.populateListWithType(list);
    if (newList.type === 'list') {
      newList = {
        ..._.omit(newList, ['children']),
        tasks: newList.tasks.map(({ id }) => id),
      };
    } else {
      newList = {
        ..._.omit(newList, ['tasks']),
        children: newList.children.map(({ id }) => id),
      };
    }
    return newList;
  },
};
