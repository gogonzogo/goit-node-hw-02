const { contacts: service } = require('../../services');

const getContactById = async (req, res) => {
  const result = await service.getContactById(req);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
