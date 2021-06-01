module.exports = {
  friendlyName: 'Map short task',

  description: '',

  inputs: {
    task: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ task }) {
    const {
      id,
      assignee,
      list,
      status: { name: statusName },
      ...rest
    } = task;

    const { id: _, ...tag } = await Tag.findOne({
      where: { id: list.tag },
      select: ['name', 'color'],
    });

    let teammate;
    if (assignee) teammate = assignee.teammate;

    return {
      id,
      assignee: teammate,
      tag,
      status: { name: statusName },
      list,
      ...rest,
    };
  },
};
