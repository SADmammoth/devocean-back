module.exports = {
  friendlyName: 'Populate history',

  description: '',

  inputs: {
    history: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ history }) {
    const { status, timeInStatus, customFields, assignee, list, ...rest } =
      history;
    let newList = list;

    if (list) {
      newList = await TaskCollection.findOne({ id: list.toString() });
    }

    let newAssignee = assignee;

    if (assignee) {
      newAssignee = await sails.helpers.assigneeToTeammate(
        await Assignee.findOne({ id: assignee.toString() }),
      );
      newAssignee = `${newAssignee.name} ${newAssignee.lastName}`;
    }

    return {
      status: status
        ? (await sails.helpers.populators.status(status.toString())).name
        : undefined,
      assignee: newAssignee,
      list: newList?.name,
      ...(customFields
        ? Object.fromEntries(
            Object.entries(customFields).map(([name, { label, value }]) => [
              label,
              value,
            ]),
          )
        : {}),
      ...rest,
    };
  },
};
