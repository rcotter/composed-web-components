const express = require('express');
const app = express();

function securityTokenMiddleware(securityToken) {
  return function verifyReqSecurityToken(req, res, next) {
    if (securityToken === req.query.token) return next();
    next({four_oh_one: `401 - request security token was ${req.query.token} but was expected to be ${securityToken}`});
  }
}

function errorMiddleware(err, req, res, next) {
  if (err.four_oh_one) {
    return res.status(401).send(err.four_oh_one);
  }
  
  next();
}

function buildApp(
  {
    port,
    publicStaticsPath,
    securedStaticsPath,
    securityToken
  } = {}
) {
  
  app.use(express.static(publicStaticsPath));
  
  app.use(securityTokenMiddleware(securityToken), express.static(securedStaticsPath));
  
  app.use(errorMiddleware);
  
  app.listen(port, () => console.log(`Microservice listening on port ${port}`));
  
  return app
}

module.exports = buildApp;