module.exports = {
  friendlyName: 'Populate list with tasks',

  description: 'Returns list with tasks',

  inputs: {
    list: { type: 'ref' },
    onlyIds: { type: 'boolean', defaultsTo: true },
  },

  exits: {
    success: {
      outputFriendlyName: 'List with tasks',
    },
  },

  fn: async function ({ list, onlyIds }) {
    let tasks = await sails.helpers.getTasksOfList(list.id);
    if (onlyIds) {
      tasks = tasks.map(({ id }) => id);
    }
    return { ...list, tasks };
  },
};
