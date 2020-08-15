const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const encryptPassword = textPassword => bcrypt.hashSync( String(textPassword) , salt);

const comparePassword = (textPassword, hashPassword) =>
  bcrypt.compareSync(textPassword, hashPassword);

module.exports = {
  encryptPassword,
  comparePassword
};