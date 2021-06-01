const request = require('superagent');
const prefix = require('superagent-prefix');

const authPath = prefix(sails.config.custom.authenticationServer);

module.exports = {
  friendlyName: 'Request user data',

  description: '',

  inputs: {
    teammateId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammateId }) {
    const user = await request
      .patch('/acceptInvite')
      .use(authPath)
      .send({ teammateId })
      .then(({ body }) => body);

    return user;
  },
};
