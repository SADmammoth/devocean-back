module.exports = {
  friendlyName: 'Populate short task',

  description: '',

  inputs: {
    query: { type: 'ref', description: 'Query of task to populate' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ query }) {
    const task = await query()
      .populate('list')
      .populate('status')
      .populate('assignee')
      .populate('template');

    if (!task) {
      return;
    }

    return await sails.helpers.mapShortTask(task);
  },
};
