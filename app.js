const express = require('express');

const app = express();

// ROUTES
const index = require('./routes/index');
const token = require('./routes/token');

app.use('/', index);
app.use('/token', token);

app.use(express.static('build'));

app.set('views', './build');

app.listen(4000, () => {
  console.log('listening on 4000!');
});

module.exports = app;
