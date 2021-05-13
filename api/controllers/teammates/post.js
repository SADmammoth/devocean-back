const request = require('superagent');
const workDays = require('../../types/enums/workDays');

module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    name: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    referAs: { type: 'string', required: true },
    avatar: { type: 'string' },
    // subteams: {
    //   type: 'ref',
    // },
    // tags: {
    //   type: 'ref',
    // },
    workMode: {
      type: 'string',
    },
    workHoursStart: {
      type: 'number',
    },
    workHoursEnd: {
      type: 'number',
    },
    workDays: {
      type: 'ref',
      defaultsTo: workDays.slice(0, 5),
    },
    timezone: {
      type: 'number',
    },
    workHours: {
      type: 'string',
      defaultsTo: 'fixed',
    },
    dateOfBirth: {
      type: 'number',
    },
    aboutYourself: {
      type: 'string',
    },
    contacts: {
      type: 'ref',
    },

    login: {
      type: 'string',
      required: true,
    },
    temporaryPassword: {
      type: 'string',
    },
    email: {
      type: 'string',
      //   required: true,
      //TODO
    },
  },

  exits: {},

  fn: async function (inputs) {
    return await sails.helpers.actions.postTeammate.with(inputs);
  },
};
