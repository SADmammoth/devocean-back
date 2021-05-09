const _ = require('@sailshq/lodash');
const prefix = require('superagent-prefix');
const request = require('superagent');

const referAs = require('../types/enums/referAs');

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    referAs: { type: 'string', isIn: referAs, required: true },
    createdNotifications: { collection: 'notification', via: 'author' },
    assignedTasks: { collection: 'assignee', via: 'teammate' },
  },
};


sails.on('teammate:updated',({ changes: model }) => {
  
  request
    .get('/teammates/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});

sails.on('teammates:created', (model) => {
  
request
    .get('/teammates/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});
