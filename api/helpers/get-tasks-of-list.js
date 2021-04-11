module.exports = {
  friendlyName: 'Get tasks of list',

  description: 'Get tasks of list through tag',

  inputs: {
    listId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Tasks of list',
    },
  },

  fn: async function ({ listId }) {
    const list = await TaskCollection.findOne({ id: listId });

    let tasks;
    if (list && list.tag) {
      tasks = await sails.helpers.getTasksOfTag(list.tag);
    }

    return tasks;
  },
};
