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
    subteams: {
      type: 'ref',
    },
    tags: {
      type: 'ref',
    },
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

  fn: async function ({ isOnInvite, id, subteams, tags, ...inputs }) {
    if (isOnInvite) {
      await sails.helpers.acceptInvite(id);
      inputs.hidden = false;
    }
    if (subteams)
      await Teammate.replaceCollection(id, 'subteams').members(subteams);
    if (tags) await Teammate.replaceCollection(id, 'tags').members(tags);

    return await Teammate.updateOne({ id }, inputs);
  },
};
