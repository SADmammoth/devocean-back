const request = require('superagent');
const prefix = require('superagent-prefix');

const authPath = prefix(sails.config.custom.authenticationServer);

module.exports = {
  friendlyName: 'Get teammate actual status',

  description: '',

  inputs: {
    teammateId: {
      type: 'string',
      required: true,
    },
    userToken: {
      type: 'string',
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Teammate actual status',
    },
  },

  fn: async function ({ teammateId, userToken }) {
    const response = await request
      .get(`/users/${teammateId}/status`)
      .use(authPath)
      .auth(userToken, { type: 'bearer' })
      .then(({ body }) => body);

    return response.status;
  },
};
