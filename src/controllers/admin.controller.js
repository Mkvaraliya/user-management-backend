import sendResponse from "../utils/sendResponse.js";
import throwError from "../utils/throwError.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const keyword = req.query.search
    ? {
        $or: [
          { fullName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const filter = {
    ...keyword,
    isDeleted: false,
  };

  const users = await User.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  sendResponse(res, 200, "Users fetched successfully", {
    users,
    page,
    totalPages: Math.ceil(total / limit),
    totalUsers: total,
  });
};


export const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.isDeleted) throwError(404, "User not found");

  user.isActive = !user.isActive;
  await user.save();

  sendResponse(res, 200, "User status updated", {
    id: user._id,
    isActive: user.isActive,
  });
};


export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.isDeleted) throwError(404, "User not found");

  user.isDeleted = true;
  user.isActive = false;
  await user.save();

  sendResponse(res, 200, "User deleted successfully");
};
