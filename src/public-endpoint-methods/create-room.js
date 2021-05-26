const { prepareResponse } = require("../response-formatter");
const { validateRequest } = require("../request-validator");
const rethinkDb = require("rethink-crud");
const cuid = require("cuid");

const database = new rethinkDb(process.env.DB_NAME);

const createRoom = async (req, res, next) => {
  try {
    validateRequest(["roomId"], req.body);
    // Create a new room
    const roomId = cuid();
    const newRoom = {
      roomId,
      createdAt: +new Date(),
    };
    await database.collection("rooms").add(newRoom);
    res.status(200).send(prepareResponse({ newRoom }));
  } catch (error) {}
};

module.exports = createRoom;
