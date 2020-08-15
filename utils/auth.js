const jwt = require("jsonwebtoken");
const sendResponse = require("./sendResponse");
const { JWT_KEY  , JWT_ALGORITHM  } = require('../config');
const privateKey = JWT_KEY || "securitykeyforprevidya" ;
const expiresIn = 60 * 60 * 24; // 1 day
const jwtConfig = {
  algorithm: JWT_ALGORITHM || "HS256" ,
  expiresIn,
};

// GENERATE TOKEN
const generateToken = (data) =>{ 
    const token = jwt.sign(data, privateKey, jwtConfig)
return token
};

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const { headers } = req;

  try {
    const token = headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    } else {
      const decodedToken = jwt.verify(token, privateKey);

      if (
        ["JsonWebTokenError", "TokenExpiredError"].includes(decodedToken.name)
      ) {
        throw Error;
      } else {
        req.body.userData = decodedToken;
        next();
      }
    }
  } catch (err) {
    return sendResponse(res, 401, {}, "Access denied, Please login");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};