const buildApp = require('../service-base');

const app = buildApp({
  publicStaticsPath: './service-2/public',
  securedStaticsPath: './service-2/secured',
  securityToken: 'svc-2'
});

app.get('/api/data', (req, res) => {
  setTimeout(
    function () {
      res.send({ data: 'Some fetched Microservice 2 data' });
    },
    Math.random() * Math.floor(3) * 1000 // Simulate real delayed response
  );
});

app.listen(
  3002,
  () => console.log(`Microservice 2 listening on port 3002`)
);