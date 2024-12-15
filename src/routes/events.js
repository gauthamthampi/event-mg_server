import express from 'express';
import { addEvent, getAllEvents, getEventsByOrganizer,bookEvent,
    editEvent,deleteEvent
} from '../controller/event.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

router.post('/add', authMiddleware, addEvent);
router.get('/', getAllEvents);
router.get("/my-events", authMiddleware, getEventsByOrganizer);
router.post('/book', authMiddleware, bookEvent);
router.put('/:id', authMiddleware, editEvent);
router.delete('/:id', authMiddleware, deleteEvent);


export default router;
