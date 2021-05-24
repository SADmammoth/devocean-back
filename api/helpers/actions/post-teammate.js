const request = require('superagent');
const prefix = require('superagent-prefix');
const workDays = require('../../types/enums/workDays');

const authPath = prefix(sails.config.custom.authenticationServer);

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
  },

  exits: {},

  fn: async function ({
    name,
    lastName,
    shortName,
    joinedAt,
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
    subteams,
    tags,

    login,
    temporaryPassword,
    email,

    hidden,
    invited,
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
      shortName: shortName || name,
      joinedAt: joinedAt ? new Date(joinedAt).getTime() : Date.now(),
      hidden,
      invited,
    }).fetch();

    await sails.helpers.addSubteamsAndTags(teammate.id, subteams, tags);

    if (!temporaryPassword) temporaryPassword = sails.helpers.faker.password();

    const endpoint = invited ? '/invite' : '/register';
    await request.post(endpoint).use(authPath).send({
      login,
      password: temporaryPassword,
      teammateId: teammate.id,
      role: 'Admin' /*TODO*/,
    });

    //TODO Send email

    return teammate;
  },
};
