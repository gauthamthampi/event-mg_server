import express from 'express';
import { addEvent, getAllEvents } from '../controller/event.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

router.post('/add', authMiddleware, addEvent);
router.get('/', getAllEvents);

export default router;
