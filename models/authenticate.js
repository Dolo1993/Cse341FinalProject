const express = require('express');
const isAuthenticated = require('./authenticate');

const router = express.Router();

router.get('/protected-route', isAuthenticated, (req, res) => {
  // This route is protected and only accessible to authenticated users
  res.json({ message: 'You are authorized to access this route' });
});

module.exports = router;
