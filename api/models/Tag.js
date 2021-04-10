const Color = require('../types/Color');

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    color: {
      ...Color,
    },
    tasks: {
      collection: 'task',
      via: 'tag',
    },
    list: {
      collection: 'taskcollection',
      via: 'tag',
    },
  },
};
