const { user: service } = require('../../services');

const userLogin = async (req, res) => {
  const result = await service.userLogin(req);
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
      status: 'Unathorized',
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
