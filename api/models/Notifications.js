const _ = require('@sailshq/lodash');

module.exports = {
  attributes: {
    title: { type: 'string', required: true },
    time: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
      custom: (val) => {
        return _.isDate(val);
      },
    },
    author: { type: 'string', required: true },
  },
};
