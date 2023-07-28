const Joi = require('joi')

const validator = (schema) => (payload) => {
  const validationResult = schema.validate(payload, { abortEarly: false });
  return validationResult;
};

const contactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
})

const validateContactData = (contactData) => {
  const { name, email, phone } = contactData;
  if (!name || !email || !phone) {
    throw new Error("Name, email, and phone are required fields.");
  }
};


exports.validateContact = validator(contactSchema);
exports.validateContactData = validateContactData;