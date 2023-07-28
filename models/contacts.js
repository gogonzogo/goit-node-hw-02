const fs = require('fs').promises;
const path = require('node:path');
const { validateContactData } = require('../routes/api/validator');
const contactsPath = path.join(__dirname, 'contacts.json');
const CONTACT_ADDED_MESSAGE = 'Contact added successfully';
const CONTACT_DELETED_MESSAGE = 'Contact deleted successfully';
const CONTACT_UPDATED_MESSAGE = 'Contact updated successfully';
const CONTACT_NOT_FOUND_MESSAGE = 'Contact not found';
const CONTACT_ALREADY_EXISTS_MESSAGE = 'Contact details already exists';

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return { error }
  }
};

async function listContacts() {
  try {
    const contactsData = await readContacts();
    return { contactsData };
  } catch (error) {
    return { error };
  }
};

async function getContactById(contactId) {
  try {
    const contactsData = await readContacts();
    const contact = contactsData.find(contact => contact.id === contactId);
    if (!contact) {
      return { message: CONTACT_NOT_FOUND_MESSAGE };
    }
    return { contact };
  } catch (error) {
    return { error };
  }
};

async function addContact(newContact) {
  try {
    const contactsData = await readContacts();
    validateContactData(newContact);
    const contactExists = contactsData.some(contact =>
      contact.name.toLowerCase() === newContact.name.toLowerCase() ||
      contact.email.toLowerCase() === newContact.email.toLowerCase() ||
      contact.phone === newContact.phone
    );
    if (contactExists) {
      return { message: CONTACT_ALREADY_EXISTS_MESSAGE };
    } else {
      contactsData.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contactsData))
      const addedContact = {
        message: CONTACT_ADDED_MESSAGE,
        [newContact.id]: newContact
      };
      return { addedContact };
    };
  }
  catch (error) {
    return { error };
  };
};

async function removeContact(contactId) {
  try {
    const contactsData = await readContacts();
    const contact = contactsData.find(contact => contact.id === contactId);
    if (contact) {
      const updatedContactsData = contactsData.filter(
        contact => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(updatedContactsData));
      return { contactDeleted: CONTACT_DELETED_MESSAGE };
    } else {
      return { contactNotFound: CONTACT_NOT_FOUND_MESSAGE };
    }
  } catch (error) {
    return { error };
  };
};

async function updateContact(contactId, updateData) {
  try {
    const contactsData = await readContacts();
    const index = contactsData.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return { message: CONTACT_NOT_FOUND_MESSAGE };
    }
    const { name, email, phone } = updateData;
    const contactExists = contactsData.some(contact =>
      contact.id !== contactId &&
      (
        (name && contact.name.toLowerCase() === name.toLowerCase()) ||
        (email && contact.email.toLowerCase() === email.toLowerCase()) ||
        (phone && contact.phone === phone)
      )
    );
    if (contactExists) {
      return { message: CONTACT_ALREADY_EXISTS_MESSAGE };
    }
    const updatedContact = {
      ...contactsData[index],
      name: name || contactsData[index].name,
      email: email || contactsData[index].email,
      phone: phone || contactsData[index].phone,
    };
    contactsData[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contactsData));
    const successfulUpdate = {
      message: CONTACT_UPDATED_MESSAGE,
      [updatedContact.id]: updatedContact,
    }
    return { successfulUpdate };
  }
  catch (error) {
    return { error };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
