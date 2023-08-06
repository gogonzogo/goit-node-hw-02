const Contacts = require('../../schemas/contactsSchema')

const addContact = async (req, res, next) => {
  await Contacts.deleteOne({ _id: req.params.id });
  res.json({
    status: "sucess",
    code: 200,
    data: {
      message: `Contact ${req.params.id} removed!`,
    },
  });
};

module.exports = addContact;
