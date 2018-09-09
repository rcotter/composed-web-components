const runApp = require('../service-base');

const app = runApp({
  port: 3001,
  publicStaticsPath: './service-1/public',
  securedStaticsPath: './service-1/secured',
  securityToken: 'svc-1'
});