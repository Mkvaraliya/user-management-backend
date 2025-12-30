import throwError from "../utils/throwError.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throwError(403, "Access denied");
    }
    next();
  };
};

export default authorize;
