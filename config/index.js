const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT,
  JWT_KEY : process.env.JWT_KEY,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM, 
  DATABASE:process.env.DATABASE
};
