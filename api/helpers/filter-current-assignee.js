module.exports = {
  friendlyName: 'Filter current assignee',

  description: '',

  inputs: {
    assignees: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ assignees }) {
    let foundTask;
    const newAssignees = await Promise.all(
      assignees.map(async (assignee) => {
        const { id, task } = assignee;
        foundTask = await Task.findOne({ id: task });
        if (!foundTask) {
          return;
        }
        return foundTask.assignee === id ? assignee : undefined;
      })
    );

    return newAssignees.filter((val) => !!val);
  },
};
