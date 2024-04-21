const express = require('express');
const router = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
