import express from "express";
import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validations/user.validation.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.use(protect);

router.get(
    "/profile", 
    asyncHandler(getProfile)

);

router.put(
    "/profile", 
    validate(updateProfileSchema), 
    asyncHandler(updateProfile)
);

export default router;
