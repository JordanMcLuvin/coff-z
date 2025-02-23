const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  aboutMe: { type: String, required: true },
  address: addressSchema,
  birthdate: { type: Date, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
