const { Contact } = require('../../models');

const addContact = async (body) => {
  try {
    const data = await Contact.create(body);
    return data;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = addContact;
