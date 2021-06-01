module.exports = {
  friendlyName: 'Assign task',

  description: '',

  inputs: {
    id: { type: 'string', description: 'Task id to be assigned' },
    teammateId: { type: 'string', description: 'Teammate to assign task' },
    assignedDate: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ id, teammateId, assignedDate }) {
    const assignee = await Assignee.create({
      teammate: teammateId,
      task: id,
      assignedDate: assignedDate ? new Date(assignedDate) : new Date(),
    }).fetch();

    const task = await Task.updateOne({ id }, { assignee: assignee.id });

    return { ...task, assignee };
  },
};
