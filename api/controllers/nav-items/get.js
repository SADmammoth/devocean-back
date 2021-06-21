const request = require('superagent');
const prefix = require('superagent-prefix');

const authPath = prefix(sails.config.custom.authenticationServer);

module.exports = {
  friendlyName: 'NavItem',

  description: 'Get nav items.',

  inputs: {
    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const features = await request
      .get('/access/features/max')
      .use(authPath)
      .auth(
        authorization || this.req.headers.authorization.replace('Bearer ', ''),
        { type: 'bearer' },
      )
      .then(({ body }) => body);

    const searchFeatures = Object.entries(features)
      .filter(([feature, value]) => value)
      .map(([feature]) => feature);

    const navItems = await NavItem.find({
      or: [
        { featureAccess: { in: searchFeatures }, workspaceId },
        { featureAccess: 'all', workspaceId },
      ],
    });

    return navItems;
  },
};
