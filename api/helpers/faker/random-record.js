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
    addUndefined: {
      type: 'bool',
      defaultsTo: false,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ Model, criteria, addUndefined }) {
    const items = await Model.find(criteria);

    if (addUndefined) {
      items.push({});
    }
    console.log(items);
    return random.arrayElement(items);
  },
};
