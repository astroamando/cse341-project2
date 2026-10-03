const express = require('express');
const passport = require('../auth');

const router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  res.status(200).json({
    message: 'Authentication successful',
    user: {
      username: req.user?.username,
      displayName: req.user?.displayName
    }
  });
});

router.get('/failed', (req, res) => {
  res.status(401).json({
    message: 'Authentication failed'
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: {
        username: req.user?.username,
        displayName: req.user?.displayName
      }
    });
  }

  return res.status(401).json({
    authenticated: false,
    message: 'You are not authenticated'
  });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.status(200).json({
        message: 'Logged out successfully'
      });
    });
  });
});

module.exports = router;