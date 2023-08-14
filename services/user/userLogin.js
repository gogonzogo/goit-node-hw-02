const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const userLogin = async (req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return 'email';
    };
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return 'password';
    };
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    req.session.userToken = token;
    req.session.userId = user._id;
    return user;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userLogin;