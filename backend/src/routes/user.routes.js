import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router()

// router.route("/register").post(registerUser) // path is http://localhost:3000/users/register as previous is added as prefix
// router.route("/login").post(registerUser) // path is http://localhost:3000/users/login
router.route("/register").post(registerUser) // path is http://localhost:3000//api/v1/users/register as previous is added as prefix

export default router;