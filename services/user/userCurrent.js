const { User } = require('../../models');

const userCurrent = async (req) => {
  try {
    const currentUser = await User.findById(req.session.userId);
    return currentUser;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userCurrent;