import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
  updateProfileController,
} from "./../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js"; 

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);


router.get("/all-users", requireSignIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); 

    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching users",
    });
  }
});

router.delete("/delete-user/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting user",
    });
  }
});

export default router;