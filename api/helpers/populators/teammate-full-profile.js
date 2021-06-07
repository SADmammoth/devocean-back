module.exports = {
  friendlyName: 'Teammate full profile',

  description: '',

  inputs: {
    teammate: {
      type: 'ref',
      required: true,
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammate, authorization }) {
    const { id, workHours, workHoursStart, workHoursEnd, workDays } = teammate;
    const status = sails.helpers.getTeammateActiveStatus(
      workHours,
      workHoursStart,
      workHoursEnd,
      workDays,
    );
    let newStatus = status;
    if (status !== undefined) {
      newStatus = status ? 'working' : 'not working';
    }
    const actualStatus = await sails.helpers.getTeammateActualStatus(
      id,
      authorization,
    );

    return { status: newStatus, actualStatus, ...teammate };
  },
};
