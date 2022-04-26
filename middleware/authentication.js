const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req,res,next) => {
    const token = req.signedCookies.token

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
    const { name, userId, role } = isTokenValid({token});
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  } 
};

const authorizePermissions = (...roles) => {
// since we are calling this middleware with arguments it gets invoked in routes and
// express is expecting a callback, so this is how we structure it.
// we return a callback inside of middleware
  return (req,res,next) => {
    if(!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Unauthorized to access this route");
    }
    next();
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
};