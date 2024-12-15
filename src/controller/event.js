import Event from '../model/event.js';
import Attendee from '../model/attendee.js';

// Add New Event
export const addEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user.id });
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
  const { userId, eventId } = req.body;

  try {
    // Fetch the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if seats are available
    if (event.availability <= 0) {
      return res.status(400).json({ message: 'Event is sold out' });
    }

    // Create a new attendee
    const attendee = new Attendee({ user: userId, event: eventId });
    await attendee.save();

    // Decrement availability
    event.availability -= 1;
    await event.save();

    res.status(201).json({ message: 'Event booked successfully', attendee });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
