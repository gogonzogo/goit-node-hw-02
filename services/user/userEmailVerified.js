const { User } = require('../../models');
const { emailVerified } = require('../../middlewares');

const userEmailVerified = async (req) => {
  try {
    const verificationToken = req.params.verificationToken
    const user = await User.findOne({ verificationToken: verificationToken });
    if (!user) {
      return 'Not Found'
    };
    const verifiedEmail = user.verify;
    if (verifiedEmail) {
      return 'already verified';
    };
    emailVerified(user.email, verificationToken)
    const verifyUser = await User.findOneAndUpdate(
      { verificationToken: verificationToken },
      { $set: { verify: true } },
      { new: true }
    );
    return verifyUser;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userEmailVerified;