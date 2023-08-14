const { Contact } = require('../../models');

const addContact = async (req) => {
  try {
    const { email, name, phone } = req.body;
    const contactExists = await Contact.findOne({ name, email, owner: req.session.userId }) !== null;
    const emailExists = await Contact.findOne({ email, owner: req.session.userId }) !== null;
    const phoneExists = await Contact.findOne({ phone, owner: req.session.userId }) !== null;
    if (contactExists) {
      return "contact";
    };
    if (emailExists) {
      return "email";
    };
    if (phoneExists) {
      return "phone";
    };
    const newContact = ({
      ...req.body,
      owner: req.session.userId,
    });
    const data = await Contact.create(newContact);
    return data;
  } catch (error) {
    console.log(error.message)
  };
};

module.exports = addContact;
