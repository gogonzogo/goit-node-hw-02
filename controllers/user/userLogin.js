const { user: service } = require('../../services');

const userLogin = async (req, res) => {
  const result = await service.userLogin(req);
  if (result === 'no credintials') {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      data: {
        message: 'Email and or password is missing!',
      },
    });
    return;
  }
  if (result === 'email') {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: 'Email does not exist',
      },
    });
    return;
  }
  if (result === 'password') {
    res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      data: {
        message: 'Email or password is wrong',
      },
    });
    return;
  }
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    }
  });
};

module.exports = userLogin;
