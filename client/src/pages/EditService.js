import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVICE_CATEGORIES } from '../data/services';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: '', location: '', price: ''
  });

  useEffect(() => {
    const fetchService = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/services`, { headers: { Authorization: `Bearer ${token}` } });
      const service = data.find(s => s._id === id);
      setForm(service);
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`/api/services/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Service updated!');
    navigate('/services');
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Edit Service</h2>
      <form onSubmit={handleUpdate} className="grid gap-4">
        <input type="text" name="title" placeholder="Service Title" value={form.title} onChange={handleChange} required />
        
        <select name="category" value={form.category} onChange={handleChange} required className="p-2 border border-gray-300 rounded">
          <option value="">Select Category</option>
          {Object.keys(SERVICE_CATEGORIES).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select name="location" value={form.location} onChange={handleChange} required className="p-2 border border-gray-300 rounded">
          <option value="">Select Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;
