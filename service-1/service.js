const buildApp = require('../service-base');

const app = buildApp({
  port: 3001,
  staticsPath: './service-1/public'
});

app.get('/hi', (req, res) => {
  res.send('app 1');
});