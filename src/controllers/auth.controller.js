import sendResponse from "../utils/sendResponse.js";
import throwError from "../utils/throwError.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throwError(409, "Email already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: "user", // 🔒 FORCE ROLE
  });

  generateToken(res, user._id);

  sendResponse(res, 201, "User registered successfully", {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  });
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    isDeleted: false,
  }).select("+password");

  if (!user) throwError(401, "Invalid credentials");
  if (!user.isActive) throwError(403, "Account is inactive");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throwError(401, "Invalid credentials");

  generateToken(res, user._id);

  sendResponse(res, 200, "Login successful", {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  });
};


export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  sendResponse(res, 200, "Logout successful");
};
