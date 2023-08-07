const { contacts: service } = require('../../services');

const addContact = async (req, res) => {
  const result = await service.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;