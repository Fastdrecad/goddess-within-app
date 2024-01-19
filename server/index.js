require('dotenv').config();
const express = require('express');
const chalk = require('chalk');

const keys = require('./config/keys');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

setupDB();

app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});
