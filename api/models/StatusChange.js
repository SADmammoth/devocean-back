const CommentAttributes = require('../types/CommentAttributes');

module.exports = {
  attributes: {
    ...CommentAttributes,
    fromStatus: {
      model: 'status',
    },
    toStatus: {
      model: 'status',
    },
    text: {
      type: 'string',
    },
  },
};
