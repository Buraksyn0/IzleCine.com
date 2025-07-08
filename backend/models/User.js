const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  city: { type: String, required: false },
  birthYear: { type: Number, required: false, min: 1900, max: new Date().getFullYear() },
  createdAt: { type: Date, default: Date.now },
  likedMovies: [
    {
      movieId: { type: String, required: true },
      likedAt: { type: Date, default: Date.now }
    }
  ],
  watchlist: [
    {
      movieId: { type: String, required: true },
      addedAt: { type: Date, default: Date.now }
    }
  ],
  comments: [
    {
      movieId: { type: String, required: true },
      commentText: { type: String },
      commentedAt: { type: Date, default: Date.now }
    }
  ]
});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema); 