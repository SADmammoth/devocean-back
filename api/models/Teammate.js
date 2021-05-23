const _ = require('@sailshq/lodash');
const prefix = require('superagent-prefix');
const request = require('superagent');

const referAs = require('../types/enums/referAs');
const workMode = require('../types/enums/workMode');
const workHours = require('../types/enums/workHours');
const workDays = require('../types/enums/workDays');

module.exports = {
  attributes: {
    hidden: {
      type: 'boolean',
    },
    name: { type: 'string' },
    lastName: { type: 'string' },
    shortName: {
      type: 'string',
    },
    joinedAt: { type: 'number', autoCreatedAt: true },
    referAs: { type: 'string', isIn: referAs },
    avatar: { type: 'string', isURL: true },
    createdNotifications: { collection: 'notification', via: 'author' },
    assignedTasks: { collection: 'assignee', via: 'teammate' },
    subteams: { collection: 'subteam', via: 'teammates' },
    tags: {
      collection: 'teammatetag',
      via: 'teammates',
    },
    workMode: {
      type: 'string',
      isIn: workMode,
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
      custom: (value) => {
        return _.isArray(value) && _.difference(value, workDays).length === 0;
      },
    },
    timezone: {
      type: 'number',
      max: 14,
      min: -12,
      isInteger: true,
    },
    workHours: {
      type: 'string',
      defaultsTo: 'fixed',
      isIn: workHours,
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
    },
  },
};

sails.on('teammate:updated', ({ changes: model }) => {
  request
    .get('/teammates/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));
});

sails.on('teammates:created', (model) => {
  request
    .get('/teammates/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));
});
