const request = require('superagent');
const prefix = require('superagent-prefix');

const authPath = prefix(sails.config.custom.authenticationServer);

module.exports = {
  friendlyName: 'Request user data',

  description: '',

  inputs: {
    userToken: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ userToken }) {
    const user = await request
      .post('/checkToken')
      .use(authPath)
      .send({ token: userToken })
      .then(({ body }) => body);

    return user;
  },
};
