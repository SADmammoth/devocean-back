const _ = require('@sailshq/lodash');

module.exports = {
  attributes: {
    title: { type: 'string', required: true },
    time: {
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    author: { model: 'teammates' },
    fullText: { type: 'string' },
  },
};
