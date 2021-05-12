const request = require('superagent');
const prefix = require('superagent-prefix');

const authApi = prefix(sails.config.custom.authenticationServer);

module.exports = async function (req, res, proceed) {
  request
    .get('/access/feature')
    .use(authApi)
    .query({ feature: 'viewTasks' })
    .set('Authorization', req.headers.authorization)
    .catch(() => res.forbidden())
    .then(({ body, statusCode }) => {
      if (statusCode !== 200) return res.forbidden();
      if (body.hasAccess) return proceed();
      return res.forbidden();
    });
};
