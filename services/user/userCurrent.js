const { User } = require('../../models');

const userCurrent = async (req) => {
  try {
    const currentUser = await User.findById(req.session.userId);
    if (currentUser === null) {
      return 'Not Authorized'
    }
    return currentUser;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userCurrent;