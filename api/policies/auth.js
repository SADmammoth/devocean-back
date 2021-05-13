const request = require('superagent');
const prefix = require('superagent-prefix');

const authApi = prefix(sails.config.custom.authenticationServer);

module.exports = async function (req, res, proceed) {
  if (!req.headers.authorization && req.query.authorization) {
    return res.forbidden();
  }

  await sails.helpers
    .requestUserData(
      req.query.authorization ||
        req.headers.authorization.replace('Bearer ', ''),
    )
    .catch(() => res.forbidden())
    .then(() => {
      return proceed();
    });
};
