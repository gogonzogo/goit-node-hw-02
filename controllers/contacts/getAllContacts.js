const Contacts = require('../../schemas/contactsSchema')

const getAllContacts = async (req, res, next) => {
  const allContacts = await Contacts.find();
  res.json({
    status: "sucess",
    code: 200,
    data: {
      results: allContacts,
    },
  });
};

module.exports = getAllContacts;