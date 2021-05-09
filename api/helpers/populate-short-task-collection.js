module.exports = {
  friendlyName: 'Populate short task collection',

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
    const tasks = await query()
      .populate('list')
      .populate('status')
      .populate('assignee')
      .populate('template');

    return await Promise.all(
      tasks.map(async (task) => await sails.helpers.mapShortTask(task))
    );
  },
};
