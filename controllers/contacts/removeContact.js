const { contacts: service } = require('../../services');

const removeContact = async (req, res) => {
  const result = await service.removeContact(req);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: `Contact ${req.params.id} removed!`,
      result,
    },
  });
};

module.exports = removeContact;
