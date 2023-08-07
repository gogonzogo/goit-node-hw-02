const { Contact } = require('../../models');

const getContactById = async (req) => {
  try {
    const data = await Contact.findOne({_id: req.params.id});
    return data;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = getContactById;
