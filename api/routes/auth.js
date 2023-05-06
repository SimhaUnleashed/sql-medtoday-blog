import express from "express";
import { register, login, logout,adminlogin } from "../controllers/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", adminlogin);
router.post("/logout", logout);
export default router;
