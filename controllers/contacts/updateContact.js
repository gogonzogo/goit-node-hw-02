const { contacts: service } = require('../../services');

const updateContact = async (req, res) => {
  const result = await service.updateContact(req);
  if (result.modifiedCount < 1) {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: `Contact ${req.params.id} does not exist in your contacts.`,
      },
    });
  }
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      message: `Contact ${req.params.id} updated!`,
      result,
    },
  });
};

module.exports = updateContact;

