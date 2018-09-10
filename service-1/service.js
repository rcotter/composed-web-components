const buildApp = require('../service-base');

const app = buildApp({
  publicStaticsPath: './service-1/public',
  securedStaticsPath: './service-1/secured',
  securityToken: 'svc-1'
});

app.get('/api/data', (req, res) => {
  setTimeout(
    function () {
      res.send({ data: 'Some fetched Microservice 1 data' });
    },
    Math.random() * Math.floor(3) * 1000 // Simulate real delayed response
  );
});

app.listen(
  3001,
  () => console.log(`Microservice 1 listening on port 3001`)
);