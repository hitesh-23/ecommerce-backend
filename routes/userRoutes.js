const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication")
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

router.route("/").get(authenticateUser,getAllUsers);
router.route("/showme").get(showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);
router.route("/:id").get(authenticateUser,getSingleUser);

module.exports = router;
