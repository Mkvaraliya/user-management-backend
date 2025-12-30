import sendResponse from "../utils/sendResponse.js";
import throwError from "../utils/throwError.js";
import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  sendResponse(res, 200, "Profile fetched successfully", req.user);
};


export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) throwError(404, "User not found");

  if (req.body.fullName) user.fullName = req.body.fullName;
  if (req.body.password) user.password = req.body.password;

  await user.save();

 sendResponse(res, 200, "Profile updated successfully", {
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});
};


