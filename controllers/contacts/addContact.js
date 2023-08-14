const { contacts: service } = require('../../services');

const addContact = async (req, res) => {
  const result = await service.addContact(req);
  if (result === 'contact') {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: 'Contact name and email combination already exists.',
      },
    });
  };
  if (result === 'email') {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: 'Email address already exists.',
      },
    });
  };
  if (result === 'phone') {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      data: {
        message: 'Phone number already exists.',
      },
    });
  };
  res.status(201).json({
    status: 'Success',
    code: 201,
    data: {
      addedContact: result,
    },
  });
};

module.exports = addContact;
