const { user: service } = require('../../services');

const userAvatarUpdate = async (req, res) => {
  const result = await service.userAvatarUpdate(req);
  res.status(200).json({
    status: "Success",
    code: 200,
    data: {
      avatarURL: result.avatarURL,
    }
  });
};

module.exports = userAvatarUpdate;