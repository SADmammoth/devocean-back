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
    )
      ? 'working'
      : 'not working';
    const actualStatus = await sails.helpers.getTeammateActualStatus(
      id,
      authorization,
    );

    return { status, actualStatus, ...teammate };
  },
};
