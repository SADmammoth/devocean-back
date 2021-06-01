const faker = require('faker');

module.exports = {
  friendlyName: 'Name',

  description: 'Name faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    return faker.name.firstName();
  },
};
