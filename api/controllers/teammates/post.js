const request = require('superagent');
const workDays = require('../../types/enums/workDays');

module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    name: { type: 'string' },
    lastName: { type: 'string' },
    shortName: {
      type: 'string',
    },
    joinedAt: {
      type: 'string',
    },
    referAs: { type: 'string' },
    avatar: { type: 'string' },
    subteams: {
      type: 'ref',
    },
    tags: {
      type: 'ref',
    },
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
    hidden: {
      type: 'boolean',
    },
    invited: {
      type: 'boolean',
    },

    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function (inputs) {
    return await sails.helpers.actions.postTeammate.with(inputs);
  },
};
