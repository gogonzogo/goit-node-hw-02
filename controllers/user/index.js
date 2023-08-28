const userSignup = require("./userSignup");
const userLogin = require("./userLogin");
const userLogout = require("./userLogout");
const userCurrent = require("./userCurrent");
const userSubscriptionUpdate = require("./userSubscriptionUpdate");
const userAvatarUpdate = require("./userAvatarUpdate");
const userVerify = require("./userVerify");
const userEmailVerified = require("./userEmailVerified");

module.exports = {
  userLogin,
  userSignup,
  userLogout,
  userCurrent,
  userSubscriptionUpdate,
  userAvatarUpdate,
  userVerify,
  userEmailVerified,
};