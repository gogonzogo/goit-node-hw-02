const { user: service } = require('../../services');

const userSubscriptionUpdate = async (req, res) => {
  const result = await service.userSubscriptionUpdate(req);
  console.log(result)
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = userSubscriptionUpdate;