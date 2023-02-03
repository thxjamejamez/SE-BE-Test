const express = require('express');
const mongoDb = require('./src/database/mongo/index');

const usersRouter = require('./src/router/users');

mongoDb.connect()
  .then(() => {
    const app = express();

    app.use('/users', usersRouter);
    app.listen(8080, () => {
      console.log('Server has started!');
    });
  })
  .catch((e) => {
    console.log(e.message);
  });