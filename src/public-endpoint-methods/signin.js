const User = require("../entities/user");
const JWTHelper = require("../jwt-helper");
const { validateRequest } = require("../request-validator");
const { prepareResponse } = require("../response-formatter");

const signin = async (req, res, next) => {
  try {
    validateRequest(["email", "password"], req.body);
    console.log('123 :>> ', 123);
    const user = new User({ email: req.body.email });
    await user.extractUserData();
    const userData = user.getData();
    if (userData) {
      // User found
      // Check if password matches
      if (user.verifyPassword(req.body.password)) {
        // Password verified
        const token = JWTHelper.createToken(userData);
        res.status(200).send(prepareResponse({ ...userData, token }));
      } else {
        throw {
          status: 401,
          message: "Password didn't match"
        };
        // Password didn't match
      }
    } else {
      throw {
        status: 401,
        message: "User not found"
      };
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(error.status || 500).send(
      prepareResponse(
        {},
        {
          errorMessage: error.message,
        }
      )
    );
  }
};

module.exports = signin;
