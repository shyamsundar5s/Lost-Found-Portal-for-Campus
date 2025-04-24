import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    type: 'lost',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tags', formData.tags);
    data.append('type', formData.type);
    data.append('image', formData.image);

    try {
      const response = await axios.post('/api/posts/create', data);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
