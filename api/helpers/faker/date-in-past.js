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

  fn: function () {
    let date = faker.datatype.datetime({
      max: Date.now(),
    });

    return date;
  },
};
