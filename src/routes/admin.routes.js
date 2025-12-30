import express from "express";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from "../controllers/admin.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get(
    "/users", 
    asyncHandler(getAllUsers)
);

router.put(
    "/users/:id/status", 
    asyncHandler(toggleUserStatus)
);

router.delete(
    "/users/:id", 
    asyncHandler(deleteUser)
);

export default router;
