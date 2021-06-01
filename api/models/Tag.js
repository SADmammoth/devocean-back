const Color = require('../types/Color');

module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    color: {
      ...Color,
    },
    lists: {
      collection: 'taskcollection',
      via: 'tag',
    },
  },
};
