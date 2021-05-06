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
