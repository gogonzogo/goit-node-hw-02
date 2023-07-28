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

exports.validateContact = validator(contactSchema);