const prefix = require('superagent-prefix');
const request = require('superagent');
const CommentAttributes = require('../types/CommentAttributes');

module.exports = {
  attributes: {
    ...CommentAttributes,
    text: {
      type: 'string',
      required: true,
    },
  },
};

sails.on('discussions:updated',({ changes: model }) => {
  request
    .get('/discussions/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});

sails.on('discussions:created', (model) => {
request
    .get('/discussions/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});