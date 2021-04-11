module.exports = {
  friendlyName: 'Get tasks of list',

  description: 'Get tasks of list through tag',

  inputs: {
    list: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tasks of list',
    },
  },

  fn: async function ({ list }) {
    let tasks;
    if (list.tag) {
      tasks = await sails.helpers.getTasksOfTag(list.tag);
    }

    return tasks;
  },
};
