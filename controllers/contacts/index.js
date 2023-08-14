const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateContactFavorite = require('./updateContactFavorite');
const getSomeContacts = require('./getSomeContacts');
const getFavoriteContacts = require('./getFavoriteContacts');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactFavorite,
  getSomeContacts,
  getFavoriteContacts,
}