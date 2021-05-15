module.exports = {
  friendlyName: 'Teammate profile',

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
    const {
      id,
      name,
      lastName,
      shortName,
      avatar,
      referAs,
      subteams,
      tags,

      workHours,
      workHoursStart,
      workHoursEnd,
      workDays,
    } = teammate;

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

    return {
      id,
      name,
      lastName,
      shortName,
      avatar,
      referAs,
      subteams,
      tags,
      status,
      actualStatus,
    };
  },
};
