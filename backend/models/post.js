const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  imageUrl: { type: String },
  type: { type: String, enum: ['lost', 'found'], required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

postSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Post', postSchema);
