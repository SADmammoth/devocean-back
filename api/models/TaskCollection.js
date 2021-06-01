const collectionTypes = require('../types/enums/collectionTypes');
const prefix = require('superagent-prefix');
const request = require('superagent');

module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    type: { type: 'string', isIn: collectionTypes, required: true },
    children: {
      collection: 'taskcollection',
      via: 'parent',
    },
    tasks: { collection: 'task', via: 'list' },
    parent: {
      model: 'taskcollection',
    },
    tag: {
      model: 'tag',
    },

    isConstant: {
      type: 'boolean',
    },
  },
};


sails.on('taskcollection:updated',({ changes: model }) => {
  
  request
    .get('/taskcollections/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});

sails.on('taskcollection:created', (model) => {
  
request
    .get('/taskcollections/notify')
    .use(prefix(sails.config.custom.subscriptionServer)).then(({body: {message}})=>console.log(message));

});
