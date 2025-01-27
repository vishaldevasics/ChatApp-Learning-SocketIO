//Package Imports
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

//Local Imports
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { app, server } from './socket/socket.js';

//Database Imports
import connectToMongoDb from './db/connectToMongoDb.js';

const PORT = process.env.PORT || 5000

dotenv.config();
 
// Middleware
app.use(express.json()); // to get data from req.body
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow content-type in headers
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server started at ' + PORT)
})

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


server.listen(PORT, () => {
  connectToMongoDb();
  console.log('Server started at ' + PORT);
})