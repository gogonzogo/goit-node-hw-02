const { user: service } = require('../../services');

const userSignup = async (req, res) => {
  const result = await service.userSignup(req);
  if (result === true) {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: "Email in use",
      },
    });
    return;
  };
  res.status(201).json({
    status: 'Success',
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = userSignup;
