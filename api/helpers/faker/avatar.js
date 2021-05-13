const { internet } = require('faker');

module.exports = {
  friendlyName: 'Password',

  description: 'Password faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    return internet.avatar();
  },
};
