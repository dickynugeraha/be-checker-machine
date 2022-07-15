const router = require("express").Router();
const AuthController = require("../controllers/Auth");

// login
router.post("/login", AuthController.login);

// register
router.post("/register", AuthController.register);

module.exports = router;
