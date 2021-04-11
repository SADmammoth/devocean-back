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
      .populate('tag')
      .populate('status')
      .populate('assignee');

    if (!task) {
      return;
    }

    const {
      id,
      assignee,
      tag: { id: tagId, ...tagFields },
      status: { name: statusName },
      timeInStatus,
      ...rest
    } = task;

    return {
      id,
      assignee: assignee.teammate,
      tag: tagFields,
      status: statusName,
      ...rest,
    };
  },
};
