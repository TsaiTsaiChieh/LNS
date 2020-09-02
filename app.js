require('dotenv').config();
const express = require('express');
const app = express();
const Haven = require('domain-haven');

app.use(Haven.haven());
app.use(express.static('./src/public'));
// Routers
app.use(require('./src/routes/index'));
app.use('/scheduler', require('./src/routes/schedulers'));
app.use('/adoption', require('./src/routes/adoption'));
// view engine
app.set('views', './src/views');
app.set('view engine', 'pug');

const port = process.env.PORT;
app.listen(port, function() {
  console.log(`LNS project on port ${port}`);
});

module.exports = app;
