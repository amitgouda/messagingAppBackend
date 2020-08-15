const dbConfig = require('../config/dbConfig');
const mongoose = require('mongoose')

const init = async () => {
    mongoose
    .connect(dbConfig.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));
};

module.exports = {
  init,
};
