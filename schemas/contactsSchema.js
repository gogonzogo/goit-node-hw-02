const { Schema, model } = require('mongoose');

const ContactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is missing.'],
  },
  email: {
    type: String,
    required: [true, 'Email field is missing.',],
    validate: {
      validator: function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      },
      message: 'Please use valid email address.'
    },
  },
  phone: {
    type: Number,
    required: [true, 'Phone field is missing.'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const Contacts = model('contacts', ContactsSchema)

module.exports = Contacts