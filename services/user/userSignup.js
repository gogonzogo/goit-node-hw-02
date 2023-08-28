const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { verifyUserEmail } = require('../../middlewares');
const { nanoid } = require('nanoid');

const userSignup = async (req) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email }) !== null;
    if (emailExists) {
      return emailExists;
    };
    const verificationToken = nanoid();
    verifyUserEmail(email, verificationToken);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAvatar = gravatar.profile_url(email, { protocol: 'https' });
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      avatarURL: userAvatar,
      verificationToken: verificationToken,
    });
    return newUser;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = userSignup;
