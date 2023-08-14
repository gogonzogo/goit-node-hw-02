const { Contact } = require('../../models');

const getFavoriteContacts = async (req) => {
  try {
    const user = req.session.userId;
    const favorite = req.query.favorite;
    const totalContacts = await Contact.countDocuments({ owner: user });
    if (totalContacts < 1) {
      return "Not Found";
    };
    const contacts = await Contact.find({ owner: user, favorite: favorite, });
    if (contacts.length < 1 && favorite) {
      return 'No Favorites';
    };
    if (contacts.length < 1 && !favorite) {
      return 'No un-Favorited';
    };
    return {
      contacts,
      totalContacts,
      favorite,
    };
  } catch (error) {
    console.log(error)
  };
};

module.exports = getFavoriteContacts;