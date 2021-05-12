const request = require('superagent');
const prefix = require('superagent-prefix');

const authApi = prefix(sails.config.custom.authenticationServer);

module.exports = async function (req, res, proceed) {
  if (!req.headers.authorization) {
    return res.forbidden();
  }

  request
    .post('/checkToken')
    .use(authApi)
    .send({ token: req.headers.authorization.replace('bearer ', '') })
    .catch(() => res.forbidden())
    .then(() => {
      return proceed();
    });
};
