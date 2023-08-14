const { Contact } = require('../../models');

const getContactById = async (req) => {
  try {
    const data = await Contact.findOne({ _id: req.params.id, owner: req.session.userId });
    return data;
  } catch (error) {
    console.log(error.message)
  };
};

module.exports = getContactById;
