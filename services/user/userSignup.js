const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignup = async (req) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email }) !== null;
    if (emailExists) {
      return emailExists;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    req.session.userToken = token;
    req.session.userId = newUser._id;
    return newUser;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = userSignup;
