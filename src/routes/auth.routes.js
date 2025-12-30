import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";

import validate from "../middlewares/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

const router = express.Router();


router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(registerUser)
);

router.post(
    "/login", 
    validate(loginSchema), 
    asyncHandler(loginUser)
);
router.post(
    "/logout", 
    asyncHandler(logoutUser)
);

export default router;
