const express = require('express');
const { createPost, searchPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost);
router.get('/search', searchPosts);

module.exports = router;
