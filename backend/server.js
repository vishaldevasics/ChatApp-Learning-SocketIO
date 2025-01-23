import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import connectToMongoDb from './db/connectToMongoDb.js';

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(express.json()); // to get data from req.body

app.get('/', (req, res) => {
  res.send('Server started at ' + PORT)
})

app.use('/api/auth',authRoutes);




app.listen(PORT, () => {
  connectToMongoDb();
  console.log('Server started at ' + PORT);
})