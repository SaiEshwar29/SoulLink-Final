const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Import API handlers
const chatHandler = require('./api/chat.js');
const bookAppointmentHandler = require('./api/book-appointment.js');

// API Routes
app.post('/api/chat', chatHandler);
app.post('/api/book-appointment', bookAppointmentHandler);

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
