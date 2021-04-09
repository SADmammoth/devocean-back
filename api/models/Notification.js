const _ = require('@sailshq/lodash');
const Date = require('../types/Date');

module.exports = {
  attributes: {
    title: { type: 'string', required: true },
    time: {
      ...Date,
      required: true,
    },
    author: { model: 'teammate' },
    fullText: { type: 'string' },
  },
};
