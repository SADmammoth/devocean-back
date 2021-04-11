module.exports = {
  friendlyName: 'Populate full task',

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

    const teammate = await sails.helpers.assigneeToTeammate(assignee);

    return {
      id,
      assignee: teammate,
      tag: tagFields,
      status: { name: statusName, timeInStatus },
      ...rest,
    };
  },
};
