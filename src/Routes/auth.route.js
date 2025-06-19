import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controller/user.controller.js";

const authRoutes = Router();

authRoutes.post("/register-user", registerUser);
authRoutes.post("/login-user", loginUser);
authRoutes.post("/logout-user", logoutUser);

export default authRoutes;
