module.exports = {
  friendlyName: 'Teammate profile',

  description: '',

  inputs: {
    teammate: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammate }) {
    const {
      id,
      name,
      lastName,
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
    const actualStatus = 'online'; //TODO

    return {
      id,
      name,
      lastName,
      avatar,
      referAs,
      subteams,
      tags,
      status,
      actualStatus,
    };
  },
};
