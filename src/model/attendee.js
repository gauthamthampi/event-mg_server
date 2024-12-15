import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
}, { timestamps: true });

const Attendee = mongoose.model('Attendee', attendeeSchema);
export default Attendee;
