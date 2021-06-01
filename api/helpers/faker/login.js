const { internet } = require('faker');

module.exports = {
  friendlyName: 'Login',

  description: 'Login faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    return internet.userName();
  },
};
