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
      .populate('list')
      .populate('status')
      .populate('assignee')
      .populate('template');

    if (!task) {
      return;
    } 

    const {
      id,
      assignee,
      list,
      status: { name: statusName },
      timeInStatus,
      ...rest
    } = task;

    const { id: _, ...tag } = await Tag.findOne({
      where: { id: list.tag },
      select: ['name', 'color'],
    });

    let teammate;
    if (assignee) teammate = await sails.helpers.assigneeToTeammate(assignee);

    return {
      id,
      assignee: teammate,
      list: list.id,
      tag,
      status: { name: statusName, timeInStatus },
      ...rest,
    };
  },
};
