const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const sendToQueue = require('../sendMailJob');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 1. Kullanıcı yorum yaptığında
exports.addUserComment = async (req, res) => {
  try {
    const { userId, movieId, content } = req.body;
    if (!userId || !movieId || !content) {
      return res.status(400).json({ message: 'Eksik bilgi.' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    const comment = new Comment({ userId, movieId, content });
    await comment.save();
    await User.findByIdAndUpdate(userId, {
      $push: { comments: { movieId, commentText: content, commentedAt: new Date() } }
    });
    return res.status(201).json({ message: 'Yorum eklendi.', comment });
  } catch (err) {
    return res.status(500).json({ message: 'Sunucu hatası.', error: err.message });
  }
};

// 2. Kullanıcı bir filmi favorilere eklediğinde
exports.addFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    if (!userId || !movieId) {
      return res.status(400).json({ message: 'Eksik bilgi.' });
    }
    const update = {
      $addToSet: { likedMovies: { movieId, likedAt: new Date() } }
    };
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    return res.status(200).json({ message: 'Film favorilere eklendi.', likedMovies: user.likedMovies });
  } catch (err) {
    return res.status(500).json({ message: 'Sunucu hatası.', error: err.message });
  }
};

// 3. Kullanıcı bir filme puan verdiğinde
exports.rateMovie = async (req, res) => {
  try {
    const { userId, movieId, rating } = req.body;
    if (!userId || !movieId || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Eksik veya hatalı bilgi.' });
    }
    // ratings alanı User modelinde yoksa, eklenmesi gerekir. Burada ratings: Map olarak varsayılmıştır.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    if (!user.ratings) user.ratings = new Map();
    user.ratings.set(movieId, rating);
    await user.save();
    return res.status(200).json({ message: 'Puan kaydedildi.', ratings: Object.fromEntries(user.ratings) });
  } catch (err) {
    return res.status(500).json({ message: 'Sunucu hatası.', error: err.message });
  }
};

// Forgot Password - Şifre sıfırlama e-postası gönderme
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // E-posta adresinin geçerli olup olmadığını kontrol et
    if (!email) {
      return res.status(400).json({ message: 'E-posta adresi gerekli.' });
    }

    // Kullanıcının veritabanında olup olmadığını kontrol et
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.' });
    }

    // Şifre sıfırlama token'ı oluştur (1 saat geçerli)
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    // Şifre sıfırlama linkini oluştur
    const resetLink = `http://localhost:3000/password-reset?token=${resetToken}`;

    // E-posta gönderme işlemini kuyruğa ekle
    const mailData = {
      email: email,
      resetLink: resetLink
    };

    await sendToQueue(mailData);

    res.status(200).json({ 
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' 
    });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Sunucu hatası oluştu.' });
  }
};

// Reset Password - Token ile şifre sıfırlama
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token ve yeni şifre gerekli.' });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Yeni şifreyi hash'le
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Kullanıcının şifresini güncelle
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Şifreniz başarıyla sıfırlandı.' });

  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Sunucu hatası oluştu.' });
  }
}; 

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, city, birthYear } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required.' });
    }

    // Validate birth year if provided
    if (birthYear && (birthYear < 1900 || birthYear > new Date().getFullYear())) {
      return res.status(400).json({ message: 'Invalid birth year.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, city, birthYear },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments by user
exports.getUserComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Get comments from Comment collection for better data structure
    const comments = await Comment.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Format comments for frontend
    const formattedComments = comments.map(comment => ({
      id: comment._id,
      content: comment.content,
      movieId: comment.movieId,
      movieTitle: comment.movieTitle || 'Movie',
      commentedAt: comment.createdAt,
      rating: comment.rating
    }));

    res.json(formattedComments);
  } catch (err) {
    console.error('Get user comments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add movie to watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ message: 'movieId is required.' });
    }
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { watchlist: { movieId, addedAt: new Date() } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user.watchlist);
  } catch (err) {
    console.error('Add to watchlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user.watchlist || []);
  } catch (err) {
    console.error('Get watchlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add liked movie
exports.addLikedMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ message: 'movieId is required.' });
    }
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { likedMovies: { movieId, likedAt: new Date() } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user.likedMovies);
  } catch (err) {
    console.error('Add liked movie error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get liked movies
exports.getLikedMovies = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user.likedMovies || []);
  } catch (err) {
    console.error('Get liked movies error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete user's comments
    await Comment.deleteMany({ userId: req.user.userId });

    // Delete user account
    await User.findByIdAndDelete(req.user.userId);

    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove movie from watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({ message: 'movieId is required.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { watchlist: { movieId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user.watchlist || []);
  } catch (err) {
    console.error('Remove from watchlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Count comments
    const commentCount = await Comment.countDocuments({ userId });

    // Get watchlist count
    const watchlistCount = user.watchlist ? user.watchlist.length : 0;

    // Get liked movies count
    const likedMoviesCount = user.likedMovies ? user.likedMovies.length : 0;

    // Get average rating if ratings exist
    let averageRating = 0;
    if (user.ratings && user.ratings.size > 0) {
      const ratings = Array.from(user.ratings.values());
      averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }

    const stats = {
      commentCount,
      watchlistCount,
      likedMoviesCount,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: user.ratings ? user.ratings.size : 0,
      memberSince: user.createdAt
    };

    res.json(stats);
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}; 