const { Contact } = require('../../models');

const getSomeContacts = async (req, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const user = req.session.userId;
    const totalContacts = await Contact.countDocuments({owner: req.session.userId});
    const pageExceedsLimit = (page - 1) * limit >= totalContacts;
    if (totalContacts < 1) {
      return 'no contacts';
    }
    if (pageExceedsLimit) {
      return 'exceeded'
    }
    const contacts = await Contact.find({ owner: user })
      .skip(offset)
      .limit(limit)
      .exec();
    return {
      contacts,
      totalContacts,
      page,
      limit,
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = getSomeContacts;