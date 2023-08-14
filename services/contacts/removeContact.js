const { Contact } = require('../../models');

const removeContact = async (req) => {
  try {
    const data = await Contact.deleteOne({ _id: req.params.id, owner: req.session.userId });
    return data;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = removeContact;
