const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { appendCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  appendCookiesToResponse({res, user: tokenUser});
  res.status(StatusCodes.CREATED).json({user:tokenUser})
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return new CustomError.BadRequestError("Please enter email and password");

  const user = await User.findOne({email});

  if(!user){
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const matchPassword = user.comparePassword(password);
  if(!matchPassword){
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = createTokenUser(user);
  appendCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    res.status(StatusCodes.OK).send({msg:"User logged out!"})
};

module.exports = {
  register,
  login,
  logout,
};
