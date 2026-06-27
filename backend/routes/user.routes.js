const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/allUsers", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/user/:id", userController.getUserProfile);
router.put("/updateProflie/:id", userController.updateUserProfile);
router.delete("/deleteProflie/:id", userController.deleteUserProfile);

module.exports = router;