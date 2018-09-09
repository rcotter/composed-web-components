const buildApp = require('../service-base');

const app = buildApp({
  port: 3002,
  staticsPath: './service-2/public'
});

app.get('/hi', (req, res) => {
  res.send('app 2');
});