const runApp = require('../service-base');

const app = runApp({
  port: 3002,
  publicStaticsPath: './service-2/public',
  securedStaticsPath: './service-2/secured',
  securityToken: 'svc-2'
});