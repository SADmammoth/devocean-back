module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function () {
    const teammates = await Teammate.find({
      select: ['name', 'lastName', 'shortName', 'avatar'],
    }).populate(['assignedTasks', 'subteams', 'tags']);
    let assignees;
    let assignedTasks;
    return await Promise.all(
      teammates.map(async (teammate) => {
        assignees = teammate.assignedTasks;
        if (!assignees) {
          return teammate;
        }

        assignees = await sails.helpers.filterCurrentAssignee(
          teammate.assignedTasks,
        );

        assignedTasks = await Promise.all(
          assignees.map((assignee) =>
            sails.helpers.assigneeToAssignedTask(assignee),
          ),
        );

        return { ...teammate, assignedTasks };
      }),
    );
  },
};
