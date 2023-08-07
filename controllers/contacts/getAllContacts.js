const { contacts: service } = require('../../services');

const getAllContacts = async (req, res) => {
  const result = await service.getAllContacts();
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllContacts;