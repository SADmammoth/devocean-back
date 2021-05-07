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
