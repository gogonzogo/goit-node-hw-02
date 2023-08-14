const { user: service } = require('../../services');

const userLogout = async (req, res) => {
  const result = await service.userLogout(req);
  if (!result) {
    res.status(401).json({
      data: {
        message: 'Not Authorized',
      }
    });
    return;
  };
  res.status(204).send();
};

module.exports = userLogout;
