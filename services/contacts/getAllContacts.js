const { Contact } = require('../../models');

const getAllContacts = async (req) => {
  try {
    const contacts = await Contact.find({ owner: req.session.userId });
    const totalContacts = await Contact.countDocuments({ owner: req.session.userId });
    return {
      contacts,
      totalContacts,
    };
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = getAllContacts;
