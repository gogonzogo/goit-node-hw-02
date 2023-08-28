const { user: service } = require('../../services');

const userVerify = async (req, res) => {
  const result = await service.userVerify(req);
  if (result === 'missing email') {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      data: {
        message: "missing required field email",
      },
    });
    return;
  };
  if (result === 'email not in db') {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: "Email does not exist in database",
      },
    });
    return;
  };
  if (result === 'verified email') {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      data: {
        message: "Verification has already been passed",
      },
    });
    return;
  };
  res.status(200).json({
    status: 'Ok',
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = userVerify;
