const { User } = require('../../models');
const { verifyUserEmail } = require('../../middlewares');

const userVerify = async (req) => {
  try {
    const { email } = req.body;
    if (!email) {
      return 'missing email';
    };
    const emailExists = await User.findOne({ email: email }) !== null;
    if (!emailExists) {
      return 'email not in db'
    }
    const verifiedEmail = await User.findOne({ email: email, verified: true }) !== null;
    if (verifiedEmail) {
      return 'verified email';
    };
    const user = await User.findOne({ email: email })
    const verificationToken = user.verificationToken
    verifyUserEmail(email, verificationToken);
    return 'email sent';
  } catch (error) {
    console.log(error.message);
  };
};

module.exports = userVerify;