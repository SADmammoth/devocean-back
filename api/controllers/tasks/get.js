module.exports = {
  friendlyName: 'Task',

  description: 'Get all tasks, populated with tag',

  inputs: {},

  exits: {
    success: {},
  },

  fn: async function () {
    const query = () =>
      Task.find({
        select: ['id', 'title', 'priority', 'tag', 'status'],
      });

    return await sails.helpers.populateShortTaskCollection(query);
  },
};
