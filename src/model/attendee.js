import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
}, { timestamps: true });

const Attendee = mongoose.model('Attendee', attendeeSchema);
export default Attendee;
