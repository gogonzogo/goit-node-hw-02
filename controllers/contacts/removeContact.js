const { contacts: service } = require('../../services');

const removeContact = async (req, res) => {
  const result = await service.removeContact(req);
  if (result.deletedCount < 1) {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: `Contact ${req.params.id} does not exist in your contacts.`,
        result,
      },
    });
    return;
  }
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      message: `Contact ${req.params.id} removed!`,
      result,
    },
  });
};

module.exports = removeContact;
