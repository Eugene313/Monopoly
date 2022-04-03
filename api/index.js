const express = require('express');
const app = express();
const login = require('./routes/auth');

app.use(login);

module.exports = app;

if (require.main === module) {
  app.listen(3001);
}
