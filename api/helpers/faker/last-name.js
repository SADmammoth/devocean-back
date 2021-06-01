const faker = require('faker');

module.exports = {
  friendlyName: 'Last name',

  description: 'Last name faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    return faker.name.lastName();
  },
};
