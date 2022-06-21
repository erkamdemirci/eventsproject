import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: Object,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  starts: {
    type: Date
  },
  ends: {
    type: Date
  },
  tickets: {
    type: Array,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
