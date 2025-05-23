const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workouts');
const port = process.env.PORT || 3000;
const cors = require('cors');
//dotenv
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;

// Middleware to handle CORS

app.use(cors());
app.use(express.json());
app.use('/api/workouts', workoutRoutes);
// Connect to MongoDB and start the server
mongoose.connect(dbURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
                console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


