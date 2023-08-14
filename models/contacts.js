const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is missing"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email field is missing"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone field is missing"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
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