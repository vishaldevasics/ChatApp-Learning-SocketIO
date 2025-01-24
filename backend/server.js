//Package Imports
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

//Local Imports
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

//Database Imports
import connectToMongoDb from './db/connectToMongoDb.js';
 
const app = express()
const PORT = process.env.PORT || 5000

dotenv.config();
 
// Middleware
app.use(express.json()); // to get data from req.body
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server started at ' + PORT)
})

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


app.listen(PORT, () => {
  connectToMongoDb();
  console.log('Server started at ' + PORT);
})