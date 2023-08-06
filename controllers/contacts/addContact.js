const Contacts = require('../../schemas/contactsSchema')

const addContact = async (req, res, next) => {
  const newContact = await Contacts.create(req.body);
  res.json({
    status: "sucess",
    code: 201,
    data: {
      results: newContact,
    },
  });
};

module.exports = addContact;
