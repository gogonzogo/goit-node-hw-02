const { contacts: service } = require('../../services');

const updateContact = async (req, res) => {
  const result = await service.updateContact(req);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: `Contact ${req.params.id} updated!`,
      result,
    },
  });
};

module.exports = updateContact;

