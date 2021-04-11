module.exports = {
  friendlyName: 'Task',

  description: 'Assign teammate to task',

  inputs: {
    id: {
      type: 'string',
      description: 'Task id to add assignee',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    teammateId: {
      type: 'string',
      require: true,
      meta: { swagger: { in: 'body' } },
    },
    assignedDate: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ id, teammateId, assignedDate }) {
    const task = await sails.helpers.assignTask(id, teammateId, assignedDate);
    if (!task) {
      return 'notFound';
    }
    const query = () => Task.findOne({ id: task.id });

    return await sails.helpers.populateFullTask(query);
  },
};
