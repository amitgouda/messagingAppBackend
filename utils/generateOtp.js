const generateOtp = (digit) => ("" + Math.random()).substring(2, 2+digit);

module.exports = generateOtp;
