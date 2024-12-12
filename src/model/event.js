const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    registeredAttendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }]
  });
  