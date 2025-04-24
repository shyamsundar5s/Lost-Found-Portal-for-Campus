import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('lost');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/posts/filter?type=${filter}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, [filter]);

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="lost">Lost Items</option>
        <option value="found">Found Items</option>
      </select>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
