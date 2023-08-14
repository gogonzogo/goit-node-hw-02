const { contacts: service } = require('../../services');

const getFavoriteContacts = async (req, res) => {
  const result = await service.getFavoriteContacts(req);
  if (result === "Not Found") {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      data: {
        message: 'No contacts found, please add contacts.',
      }
    });
    return;
  };
  if (result === "No Favorites") {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      data: {
        message: 'No contacts favorited, please update contacts favorite.',
      }
    });
    return;
  };
  if (result === "No Favorites") {
    res.status(404).json({
      status: "No un-Favorited",
      code: 404,
      data: {
        message: 'No un-favorited contacts, please update contacts favorite.',
      }
    });
    return;
  };
  res.status(200).json({
    status: "Success",
    code: 200,
    totalContacts: result.totalContacts,
    favorite: result.favorite,
    data: {
      contacts: result.contacts,
    }
  });
};

module.exports = getFavoriteContacts;