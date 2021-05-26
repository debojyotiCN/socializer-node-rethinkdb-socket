const { prepareResponse } = require("../response-formatter");
const { validateRequest } = require("../request-validator");
const rethinkDb = require("rethink-crud");
const cuid = require("cuid");

const database = new rethinkDb(process.env.DB_NAME);

const leaveRoom = async (req, res, next) => {
  try {
    validateRequest(["userId", "roomId"], req.body);
    // Create a new user
    const { userConfigs, roomId, userName } = req.body;
    const userId = cuid();
    const newUser = {
      userId,
      userName,
      roomId,
      createdAt: +new Date(),
      userConfigs,
    };
    await database.collection("users").add(newUser);
    res.status(200).send(prepareResponse({ newUser }));
  } catch (error) {}
};

module.exports = leaveRoom;
