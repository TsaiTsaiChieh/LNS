require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.json('ok');
});

const port = process.env.PORT;
app.listen(port, function()  {
  console.log(`Love Never Stray on port ${port}`);
});
module.exports = app;