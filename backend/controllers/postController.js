const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

exports.createPost = async (req, res) => {
  try {
    const { title, description, tags, type } = req.body;
    const file = req.file;

    let imageUrl = '';
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path);
      imageUrl = uploadResult.secure_url;
    }

    const post = await Post.create({
      title,
      description,
      tags: tags.split(','),
      type,
      imageUrl,
      user: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $text: { $search: query },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
