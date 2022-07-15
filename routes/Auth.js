const router = require("express").Router();
const AuthController = require("../controllers/Auth");

// login
router.post("/login", AuthController.login);
