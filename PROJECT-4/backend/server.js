/* =============================================
   PROJECT-4 | server.js
   Express app entry point
   ============================================= */

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const { initDatabase } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start only after database is ready
initDatabase();

app.listen(PORT, () => {
  console.log('');
  console.log('🚀  PROJECT-4 server running');
  console.log('   Open this in your browser:');
  console.log('   http://localhost:' + PORT);
  console.log('');
});
