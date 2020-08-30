require('dotenv').config();
const express = require('express');
const app = express();
const Haven = require('domain-haven');

app.use(Haven.haven());
app.use(express.static('./src/public'));
// Routers
app.use(require('./src/routers/index'));
app.use('/scheduler', require('./src/routers/schedulers'));
// view engine
app.set('views', './src/views');
app.set('view engine', 'pug');

const port = process.env.PORT;
app.listen(port, function() {
    console.log(`Love Never Stray on port ${port}`);
});

module.exports = app;