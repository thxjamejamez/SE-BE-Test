const mongoose = require('mongoose');

const config = require('../../../config');

const connectionParams = {
  useFindAndModify: false,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true 
}

module.exports.connect = async () => {
  await mongoose
    .connect(config.mongo.URI, connectionParams)
    .then(() => {
      console.log('Connected to MongoDB.');
    })
    .catch((e) => {
      throw new Error (e.message);
    });
}

module.exports.disconnect = async () => {
  await mongoose
    .connection
    .close()
    .then(() => {
      console.log('Disconnected to MongoDB.');
    })
    .catch((e) => {
      throw new Error (e.message);
    });
}
