const request = require('superagent');
const workDays = require('../../types/enums/workDays');

module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
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

    email: {
      type: 'string',
      //   required: true,
      //TODO
    },

    isOnInvite: {
      type: 'boolean',
      defaultsTo: false,
    },

    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ isOnInvite, id, ...inputs }) {
    if (inputs.isOnInvite) {
      await sails.helpers.acceptInvite(id);
    }
    return await Teammate.updateOne({ id }, inputs);
  },
};