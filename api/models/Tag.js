const Color = require('../types/Color');

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    color: {
      ...Color,
    },
  },
};
