const { random } = require('faker');

module.exports = {
  friendlyName: 'Random enum item',

  description: 'Random enum item faker.',

  inputs: {
    enumeration: { type: 'ref' },
  },

  sync: true,

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ enumeration }) {
    return random.arrayElement(enumeration);
  },
};
