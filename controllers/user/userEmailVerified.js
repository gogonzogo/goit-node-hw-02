const { user: service } = require('../../services');

const userEmailVerified = async (req, res) => {
  const result = await service.userEmailVerified(req);
  if (result === 'Not Found') {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: "User not found",
      },
    });
    return;
  };
  if (result === 'already verified') {
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
      message: 'Verification successful',
    },
  });
};

module.exports = userEmailVerified;