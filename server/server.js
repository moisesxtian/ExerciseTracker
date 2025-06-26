const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user'); // Import user routes
const port = process.env.PORT || 3000;
const cors = require('cors');
//dotenv
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;

// Middleware to handle CORS
const allowedOrigins = [
    "https://exercise-tracker-livid.vercel.app",
    "https://api.hyxcreation.tech",
    "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

//default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// User Login/Signup routes
app.use('/api/users', userRoutes); // Use user routes
//Workout routes
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


