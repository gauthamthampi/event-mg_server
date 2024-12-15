import Event from '../model/event.js';
import Attendee from '../model/attendee.js';

// Add New Event
export const addEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user.id,availability:req.body.maxAttendees });
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events); // Return events as JSON
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Server error, unable to fetch events' });
  }
};

export const getEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.user._id; // The authenticated user's ID from the middleware
    const events = await Event.find({ organizer: organizerId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const bookEvent = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from middleware
    const { eventId } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already booked this event
    const existingBooking = await Attendee.findOne({ user: userId, event: eventId });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event.' });
    }

    // Check if seats are available
    if (event.availability <= 0) {
      return res.status(400).json({ message: 'No seats available for this event.' });
    }

    // Create a new attendee record
    const attendee = new Attendee({
      user: userId,
      event: eventId,
    });
    await attendee.save();

    // Update event availability
    event.availability -= 1;
    await event.save();

    res.status(201).json({ message: 'Event booked successfully!' });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};