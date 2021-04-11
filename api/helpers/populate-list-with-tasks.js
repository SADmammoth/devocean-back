module.exports = {
  friendlyName: 'Populate list with tasks',

  description: 'Returns list with tasks',

  inputs: {
    list: { type: 'ref', required: true },
    onlyIds: { type: 'boolean', defaultsTo: true },
  },

  exits: {
    success: {
      outputFriendlyName: 'List with tasks',
    },
  },

  fn: async function ({ list, onlyIds }) {
    let tasks = await sails.helpers.getTasksOfList(list.id);

    if (!tasks) {
      return { ...list, tasks: [] };
    }

    if (onlyIds) {
      tasks = tasks.map(({ id }) => id);
    }
    return { ...list, tasks };
  },
};
