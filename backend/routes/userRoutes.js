const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-users").get(getUsers);

module.exports = router;
