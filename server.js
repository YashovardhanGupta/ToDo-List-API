require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');



//! Initialize app
const app = express();

app.use(express.json());

//! 2. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

//! Routes
app.get('/', (req, res) => {
    res.send('Hello! The To-Do API is running.');
});
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

//! Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});