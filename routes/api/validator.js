const Joi = require('joi')

const validator = (schema) => (payload) => {
  console.log('Input payload:', payload);
  const validationResult = schema.validate(payload, { abortEarly: false });
  console.log('Validation Result:', validationResult);
  return validationResult;
};


const contactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
})

exports.validateContact = validator(contactSchema);