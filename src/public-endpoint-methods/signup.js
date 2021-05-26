const { validateRequest } = require("../../request-validator");
const { validateAuthentication } = require("../../auth-validator");
const { prepareResponse } = require("../../response-formatter");
const rethinkDb = require("rethink-crud");
const cuid = require("cuid");

const deepPocketDbRef = new rethinkDb(process.env.DB_NAME);

const addBankAccount = async (req, res, next) => {
  try {
    validateAuthentication(req.auth);
    validateRequest(
      ["bankName", "accNumber", "holderName", "balance"],
      req.body
    );
    let users = await deepPocketDbRef
      .collection("users")
      .get({ email: req.auth.payload.email });
    user = users && users.length > 0 ? users[0] : null;
    // Check if account exists with same account number
    const userBanks = await deepPocketDbRef
      .collection("banks")
      .get({ accNumber: req.body.accNumber, userId: user.id });
    if (userBanks && userBanks.length) {
      throw {
        status: "500",
        message: "Bank already exists with same account number",
      };
    }
    // Create bank
    const newBank = {
      id: cuid(),
      ...req.body,
      userId: user.id,
    };
    await deepPocketDbRef.collection("banks").add(newBank);
    res.status(200).send(prepareResponse({ newBank }));
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

module.exports = addBankAccount;