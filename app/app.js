const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'app');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(
  3000,
  () => console.log(`App listening on port 3000`)
);