const faker = require('faker');

module.exports = {
  friendlyName: 'Title',

  description: 'Title faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    const title = faker.fake(
      '{{hacker.verb}} {{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}} with {{hacker.adjective}} {{hacker.noun}}'
    );

    return title.charAt(0).toUpperCase() + title.slice(1);
  },
};
