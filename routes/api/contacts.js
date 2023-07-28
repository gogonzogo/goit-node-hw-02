const express = require('express')
const router = express.Router()
const path = require('node:path');
const contactsPath = path.join(__dirname, '..', '..', 'models', 'contacts.js');
const contactsFuncs = require(contactsPath)
const { nanoid } = require('nanoid');
const { validateContact } = require('./validator');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsFuncs.listContacts();
    res.status(200).json({
      data: {
        contacts,
      }
    })
  }
  catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsFuncs.getContactById(contactId);
  const { error, message, contact } = result;

  if (error) {
    return next(error);
  } else if (message) {
    return res.status(404).json({
      message: message,
    });
  } else if (contact) {
    return res.status(200).json({
      contact: contact,
    });
  }
});

router.post('/', async (req, res, next) => {
  const { error } = validateContact(req.body);

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      message: 'Validation error',
      errors: errorMessages,
    });
  } else {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'missing required field',
      });
    } else if (name && email && phone) {
      const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      };
      const result = await contactsFuncs.addContact(newContact);
      const { error, message, addedContact } = result;

      if (error) {
        return next(error);
      } else if (message) {
        return res.status(400).json({
          message: message,
        });
      } else if (addedContact) {
        res.status(201).json({
          addedContact,
        });
      }
    }
  }
});


router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsFuncs.removeContact(contactId);
  const { contactDeleted, contactNotFound, error } = result;

  if (error) {
    return next(error);
  } else if (contactNotFound) {
    return res.status(404).json({
      message: contactNotFound,
    });
  } else if (contactDeleted) {
    return res.status(200).json({
      message: result,
    });
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { error } = validateContact(req.body);

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      message: 'Validation error',
      errors: errorMessages,
    });
  } else {
    const { contactId } = req.params;
    const contactUpdateData = req.body;

    if (!req.body) {
      return req.status(400).json({ "message": "missing fields" });
    } else {
      const result = await contactsFuncs.updateContact(contactId, contactUpdateData);
      const { error, message, updatedContact } = result;
      if (error) {
        return next(error);
      } else if (message) {
        return res.status(400).json({ message })
      } else if (updatedContact) {
        return res.status(200).json({ updatedContact })
      }
    }
  }
})


module.exports = router
