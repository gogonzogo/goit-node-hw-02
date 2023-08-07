const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is missing"],
    },
    email: {
      type: String,
      required: [true, "Email field is missing"],
    },
    phone: {
      type: String,
      required: [true, "Phone field is missing"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const Contact = model('contact', contactsSchema);

module.exports = {
  Contact,
  joiSchema,
}