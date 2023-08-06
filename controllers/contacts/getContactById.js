const Contacts = require('../../schemas/contactsSchema')

const getContactById = async (req, res, next) => {
  const contact = await Contacts.findOne({ _id: req.params.id });
  res.json({
    status: "sucess",
    code: 200,
    data: {
      results: contact,
    },
  });
};

module.exports = getContactById;
