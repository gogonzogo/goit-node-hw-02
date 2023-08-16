const { user: service } = require('../../services');

const userCurrent = async (req, res) => {
  const result = await service.userCurrent(req);
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = userCurrent;
