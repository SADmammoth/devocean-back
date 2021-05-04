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
