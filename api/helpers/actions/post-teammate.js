const request = require('superagent');
const prefix = require('superagent-prefix');
const workDays = require('../../types/enums/workDays');

const authPath = prefix(sails.config.custom.authenticationServer);

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

  fn: async function ({
    name,
    lastName,
    referAs,
    avatar,
    workMode,
    workHoursStart,
    workHoursEnd,
    workDays,
    timezone,
    workHours,
    dateOfBirth,
    aboutYourself,
    contacts,

    login,
    temporaryPassword,
    email,
  }) {
    const teammate = await Teammate.create({
      name,
      lastName,
      referAs,
      avatar,
      workMode,
      workHoursStart,
      workHoursEnd,
      workDays,
      timezone,
      workHours,
      dateOfBirth,
      aboutYourself,
      contacts,
      email,
    }).fetch();

    if (!temporaryPassword) temporaryPassword = sails.helpers.faker.password();

    await request.post('/register').use(authPath).send({
      login,
      password: temporaryPassword,
      teammateId: teammate.id,
      role: 'Admin' /*TODO*/,
    });

    //TODO Send email

    return teammate;
  },
};
