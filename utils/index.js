const { createJWT, isTokenValid, appendCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  appendCookiesToResponse,
  checkPermissions
};