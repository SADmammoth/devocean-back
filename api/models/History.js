const prefix = require('superagent-prefix');
const request = require('superagent');
const CommentAttributes = require('../types/CommentAttributes');

module.exports = {
  attributes: {
    ...CommentAttributes,
    changedFields: {
      type: 'ref',
      required: true,
    },
    before: {
      type: 'ref',
    },
    after: {
      type: 'ref',
    },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
  },
};

sails.on('history:updated', async ({ changes: model }) => {
  console.log(0);
  await request
    .get('/history/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));
});
