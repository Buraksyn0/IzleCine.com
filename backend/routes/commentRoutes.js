const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.addComment); // /api/comments
router.get('/:movieId', commentController.getCommentsByMovie); // /api/comments/:movieId

module.exports = router; 