const { contacts: service } = require('../../services');

const getAllContacts = async (req, res) => {
  const result = await service.getAllContacts(req);
  if (result.length < 1) {
    res.status(200).json({
      status: 'Success',
      code: 200,
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