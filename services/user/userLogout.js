const { User } = require('../../models');

const userLogout = async (req) => {
  try {
  const userLoggedIn = await User.findById(req.session.userId) !== null;
    return userLoggedIn;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userLogout;
