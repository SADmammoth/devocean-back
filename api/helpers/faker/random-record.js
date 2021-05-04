const { random } = require('faker');

module.exports = {
  friendlyName: 'Random record',

  description: 'Random record faker.',

  inputs: {
    Model: {
      type: 'ref',
    },
    criteria: {
      type: 'ref',
      defaultsTo: {},
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ Model, criteria }) {
    const items = await Model.find(criteria);

    return random.arrayElement(items);
  },
};
