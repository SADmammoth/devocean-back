const faker = require('faker');

module.exports = {
  friendlyName: 'Duration',

  description: 'Duration faker.',

  inputs: { max: { type: 'number' } },

  sync: true,

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ max }) {
    let duration = faker.datatype.number({ min: 0, max: max || 100 });
    const is0 = faker.datatype.boolean();

    if (is0) {
      duration = 0;
    }

    return duration;
  },
};
