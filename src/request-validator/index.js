const validateRequest = (requiredKeys = [], requestBody) => {
  console.log('requestBody :>> ', requestBody);
  if (requiredKeys && requiredKeys.length) {
    requiredKeys.forEach((key) => {
      if (!requestBody[key]) {
        throw {
          status: 500,
          message: `${key} not provided`
        };
      }
    });
  }
};

module.exports = { validateRequest };
