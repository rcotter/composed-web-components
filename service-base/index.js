const express = require('express');
const app = express();

function buildApp({ port, staticsPath } = { port: 3000 }) {
  app.use(express.static(staticsPath));
  app.get('/', (req, res) => res.send(`Hello on port ${port}`));
  
  app.listen(port, () => console.log(`Example app listening on port ${port}`));
  
  return app
}

module.exports = buildApp;