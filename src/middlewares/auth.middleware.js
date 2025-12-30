import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import throwError from "../utils/throwError.js";
import User from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) throwError(401, "Not authorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    _id: decoded.id,
    isDeleted: false,
    isActive: true,
  });

  if (!user) throwError(401, "User not authorized");

  req.user = user;
  next();
});

export default protect;
