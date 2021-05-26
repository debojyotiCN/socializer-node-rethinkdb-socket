// Process imports
const { Router } = require("express");
const createRoom = require('../public-endpoint-methods/create-room');
const addUser = require('../public-endpoint-methods/add-user');

// Create an instance of express router
const PublicApi = Router();

// Group and handle routes with various methods
PublicApi.route('/createRoom')
	.post(createRoom);
PublicApi.route('/addUser')
	.post(addUser);
// PublicApi.route('/signup')
	// .post(signup)

module.exports = PublicApi;
