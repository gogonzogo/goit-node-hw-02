const { contacts: service } = require('../../services');

const getContactById = async (req, res) => {
  const result = await service.getContactById(req);
  if (result === null) {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: `Contact ${req.params.id} does not exist in your contacts.`,
      },
    });
    return;
  };
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
