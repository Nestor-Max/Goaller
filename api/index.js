const express = require('express');
const router = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
connectDB();

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/user', require('./routes/userRoute'));

app.listen(port, () => console.log(`Server started on port ${port}`));
