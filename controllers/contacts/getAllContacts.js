const { contacts: service } = require('../../services');

const getAllContacts = async (req, res) => {
  const result = await service.getAllContacts(req);
  if (result.contacts.length < 1) {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: 'No Contacts stored, please add contacts.',
      },
    });
    return;
  };
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: result,
  });
};

module.exports = getAllContacts;