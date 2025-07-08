const Comment = require('../models/Comment');
const User = require('../models/User');

exports.addComment = async (req, res) => {
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
    res.status(201).json({ message: 'Yorum eklendi.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await Comment.find({ movieId }).populate('userId', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
}; 