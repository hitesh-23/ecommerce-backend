const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// router.get("/", getAllUsers);
// router.get("/:id", getSingleUser).patch("/:id", updateUser);
// router.post("/update/password", updateUserPassword);

// first we check for authentication and then only we check for authorization
router.route("/").get(authenticateUser, authorizePermissions('admin',"owner"), getAllUsers);
router.route("/showme").get(authenticateUser,showCurrentUser);
router.route("/updateUser").post(authenticateUser,updateUser);
router.route("/updateUserPassword").post(authenticateUser,updateUserPassword);
router.route("/:id").get(authenticateUser,getSingleUser);

module.exports = router;
