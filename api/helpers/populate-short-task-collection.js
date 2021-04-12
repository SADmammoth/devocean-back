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
      .populate('tag')
      .populate('status')
      .populate('assignee');

    return tasks.map(
      ({
        id,
        assignee,
        tag: { id: tagId, ...tagFields },
        status: { name: statusName },
        ...rest
      }) => {
        return {
          id,
          assignee: assignee.teammate,
          tag: tagFields,
          status: statusName,
          ...rest,
        };
      }
    );
  },
};
