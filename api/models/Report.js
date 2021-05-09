const prefix = require('superagent-prefix');
const request = require('superagent');
const CommentAttributes = require('../types/CommentAttributes');
const Duration = require('../types/Duration');

module.exports = {
  attributes: {
    ...CommentAttributes,
    reportedTime: { ...Duration, required: true },
    estimate: { ...Duration, type: 'number' },
    activity: {
      type: 'string',
    },
    createdAt: {
      type: 'number',
      autoCreatedAt: true,
    },
  },
};


sails.on('report:updated',({ changes: model }) => {
  
  request
    .get('/reports/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});

sails.on('report:created', (model) => {
  
request
    .get('/reports/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});
