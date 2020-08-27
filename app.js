require('dotenv').config();
const express = require('express');
const app = express();

// Routers
app.use('/scheduler', require('./src/routers/schedulers'));

const port = process.env.PORT;
app.listen(port, function()  {
  console.log(`Love Never Stray on port ${port}`);
});

module.exports = app;