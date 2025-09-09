import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 5, comment: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/reviews', { ...form, service: serviceId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Review submitted!');
      navigate(`/reviews/${serviceId}`);
    } catch (err) {
      alert('Error submitting review');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="rating" value={form.rating} onChange={handleChange} required>
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star</option>)}
        </select>
        <textarea name="comment" value={form.comment} placeholder="Write your review..." onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
