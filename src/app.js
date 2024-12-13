import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { dbConnection } from './config/db.js';
import eveRoutes from './routes/events.js';
import usRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// Middleware
app.use(express.json());
dbConnection();

// Routes
app.use('/api/users', usRoutes);
app.use('/api/events', eveRoutes);

app.listen(PORT, () => {
    console.log("Server hosted successfully on port: " + PORT);
});
