const Contacts = require('../../schemas/contactsSchema')

const addContact = async (req, res, next) => {
  const update = await Contacts.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true });
  const updatedContact = await Contacts.findOne({ _id: req.params.id });
  res.json({
    status: "sucess",
    code: 200,
    data: {
      result: {
        update,
        updatedContact,
      }
    },
  });
};

module.exports = addContact;
