import { model, Schema } from 'mongoose';

const EventSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: String,
}, {
  timestamps: true,
});

export default model('Event', EventSchema);
