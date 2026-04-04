import { Router } from "express";
import registerUser, { loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/register").post(registerUser) // path is http://localhost:3000/users/register as previous is added as prefix
// router.route("/login").post(registerUser) // path is http://localhost:3000/users/login
// router.route("/register").post(registerUser) // path is http://localhost:3000//api/v1/users/register as previous is added as prefix
// router.route("/register").post(registerUser) // sime ham file upload wala kaha use kre. 
router.route("/register").post(
    upload.fields([
        { // we have 2 files -> ye req me hi dump kr deta hai in files ko as a middleware
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)


// secured routes 
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)



export default router;