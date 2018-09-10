const express = require('express');
const app = express();

function enableCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

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
    publicStaticsPath,
    securedStaticsPath,
    securityToken
  } = {}
) {
  
  app.use(enableCorsMiddleware);
  
  app.use(express.static(publicStaticsPath));
  
  app.use('/secured', securityTokenMiddleware(securityToken), express.static(securedStaticsPath));
  
  app.use(errorMiddleware);
  
  return app
}

module.exports = buildApp;