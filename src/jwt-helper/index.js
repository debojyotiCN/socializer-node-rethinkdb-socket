const jwt = require("jsonwebtoken");

class JWTHelper {
  static createToken(payload = {}) {
    const token = jwt.sign(
      {
        payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
      },
      process.env.JWT_SECRET
    );
    return token;
  }

  static isTokenValid(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (err) {
      return false;
    }
  }

  static parseTokenData(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw `Invalid token`;
    }
  }
}

module.exports = JWTHelper;
