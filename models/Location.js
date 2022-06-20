import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = mongoose.models.Location || mongoose.model('Location', LocationSchema);
