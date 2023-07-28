const fs = require('fs').promises;
const path = require('node:path');
const contactsPath = path.join(__dirname, 'contacts.json');

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
    return contactsData;
  } catch (error) {
    return { error };
  };
};

async function getContactById(contactId) {
  try {
    const contactsData = await readContacts();
    const contact = contactsData.find(contact => contact.id === contactId);
    if (!contact) {
      const message = `Not Found`;
      return { message };
    } else {
      return { contact };
    }
  } catch (error) {
    return { error };
  }
};

async function addContact(newContact) {
  try {
    const contactsData = await readContacts();
    const contactExists = contactsData.find(contact =>
      contact.name.toLowerCase() === newContact.name.toLowerCase() ||
      contact.email.toLowerCase() === newContact.email.toLowerCase() ||
      contact.phone === newContact.phone
    );

    if (contactExists) {
      const message = `Contact already exists`;
      return { message };
    } else {
      contactsData.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contactsData))
      const addedContact = { [newContact.id]: newContact };
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
      const contactDeleted = 'contact deleted';
      return { contactDeleted };
    } else {
      const contactNotFound = 'Not found';
      return { contactNotFound };
    }
  } catch (error) {
    return { error };
  };
};

async function updateContact(contactId, updateData) {
  try {
    const contactsData = await readContacts();
    const existingContact = contactsData.find((contact) => contact.id === contactId);

    if (!existingContact) {
      return { message: 'Contact not found' };
    };

    const { name, email, phone } = updateData;
    let contactExists = false;

    if (name || email || phone) {
      contactExists = contactsData.some((contact) => {
        return (
          contact.id !== contactId &&
          ((!name || contact.name.toLowerCase() === name.toLowerCase()) &&
            (!email || contact.email.toLowerCase() === email.toLowerCase()) &&
            (!phone || contact.phone === phone))
        );
      });
    };

    if (contactExists) {
      return { message: 'Contact name, number or email already exists' };
    } else {
      const updatedContactsData = contactsData.map((contact) => {
        if (contact.id === contactId) {
          return {
            ...contact,
            name: name || contact.name,
            email: email || contact.email,
            phone: phone || contact.phone,
          };
        } else {
          return contact;
        };
      });
      await fs.writeFile(contactsPath, JSON.stringify(updatedContactsData));
      const updatedContact = updatedContactsData.find((contact) => contact.id === contactId);
      return { updatedContact };
    }
  } catch (error) {
    return { error };
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
