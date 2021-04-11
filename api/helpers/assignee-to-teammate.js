module.exports = {
  friendlyName: 'Assignee to teammate',

  description: '',

  inputs: {
    assignee: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ assignee }) {
    const { teammate: id, assignedDate } = assignee;
    const teammate = await Teammate.findOne({
      where: { id },
      select: ['id', 'name', 'lastName'],
    });

    return { ...teammate, assignedDate };
  },
};
