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
      min: Date.now(),
      max: new Date(2022, 1),
    });

    return date;
  },
};
