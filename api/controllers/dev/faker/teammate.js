const _ = require('@sailshq/lodash');

const workModeEnum = require('../../../types/enums/workMode');
const referAsEnum = require('../../../types/enums/referAs');
const workDaysEnum = require('../../../types/enums/workDays');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {
    count: {
      type: 'number',
      defaultsTo: 1,
    },
    name: { type: 'string' },
    lastName: { type: 'string' },
    referAs: { type: 'string' },
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
    },
    temporaryPassword: {
      type: 'string',
    },
    email: {
      type: 'string',
      //   required: true,
      //TODO
    },

    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({
    count,
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
    authorization,
  }) {
    let teammate;
    const teammates = await Promise.all(
      new Array(count).fill(0).map(async () => {
        teammate = {
          name: name || sails.helpers.faker.name(),
          lastName: lastName || sails.helpers.faker.lastName(),
          referAs: referAs || sails.helpers.faker.randomEnumItem(referAsEnum),
          avatar: avatar || sails.helpers.faker.avatar(),
          workMode:
            workMode || sails.helpers.faker.randomEnumItem(workModeEnum),
          workHoursStart: workHoursStart || 25200000,
          workHoursEnd: workHoursEnd || 55800000,
          workDays: workDays || workDaysEnum.slice(0, 5),
          timezone: timezone || 3,
          workHours: workHours || 'fixed',
          dateOfBirth: dateOfBirth || sails.helpers.faker.dateInPast(),
          aboutYourself: aboutYourself || sails.helpers.faker.text(),
          contacts: contacts || {
            Skype: 'live:21424234242',
          },

          temporaryPassword: temporaryPassword || 'password',
          login: login || sails.helpers.faker.login(),
          email: email || 'lo.ma200018@gmail.com',
          invited: true,
          authorization:
            authorization ||
            this.req.headers.authorization.replace('Bearer ', ''),
        };

        return await sails.helpers.actions.postTeammate.with(teammate);
      }),
    );

    return teammates;
  },
};
