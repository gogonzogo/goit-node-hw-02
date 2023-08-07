const { Contact } = require('../../models');

const updateContact = async (req, body) => {
  try {
    const data = await Contact.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = updateContact;
