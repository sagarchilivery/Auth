import express from "express";
import { all_user, user_login, user_signup, verifyToken } from "../controllers/userController.js";

export let router = express.Router();

router.post("/login", user_login);
router.post("/signup", user_signup);
router.get("/users", all_user);
router.get("/users/data", verifyToken);
