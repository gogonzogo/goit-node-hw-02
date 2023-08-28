const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password);
};

const joiUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const User = model('users', userSchema);

module.exports = {
  User,
  joiUserSchema,
  subscriptionSchema,
};
