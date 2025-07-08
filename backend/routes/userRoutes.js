const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

router.post('/', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], userController.register); // /api/users
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], userController.login); // /api/users/login
router.post('/forgot-password', userController.forgotPassword); // /api/users/forgot-password
router.post('/reset-password', userController.resetPassword); // /api/users/reset-password

// Profile routes
router.get('/profile', auth, userController.getProfile); // /api/users/profile
router.put('/profile', auth, userController.updateProfile); // /api/users/profile

// Liked movies routes
router.get('/liked-movies', auth, userController.getLikedMovies); // /api/users/liked-movies
router.post('/liked-movies', auth, userController.addLikedMovie); // /api/users/liked-movies

// Comments routes
router.get('/comments', auth, userController.getUserComments); // /api/users/comments

// Watchlist routes
router.get('/watchlist', auth, userController.getWatchlist); // /api/users/watchlist
router.post('/watchlist', auth, userController.addToWatchlist); // /api/users/watchlist
router.delete('/watchlist/:movieId', auth, userController.removeFromWatchlist); // /api/users/watchlist/:movieId

// User statistics
router.get('/stats', auth, userController.getUserStats); // /api/users/stats

// Account management
router.put('/change-password', auth, userController.changePassword); // /api/users/change-password
router.delete('/account', auth, userController.deleteAccount); // /api/users/account

// Legacy routes (for backward compatibility) - MOVED TO END
router.get('/:id/comments', userController.getUserComments); // /api/users/:id/comments
router.post('/:id/watchlist', auth, userController.addToWatchlist); // /api/users/:id/watchlist
router.get('/:id/watchlist', auth, userController.getWatchlist); // /api/users/:id/watchlist
router.post('/:id/likedmovies', auth, userController.addLikedMovie); // /api/users/:id/likedmovies
router.get('/:id/likedmovies', auth, userController.getLikedMovies); // /api/users/:id/likedmovies

module.exports = router; 