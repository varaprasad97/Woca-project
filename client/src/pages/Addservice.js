import React, { useState } from 'react';
import axios from 'axios';
import { SERVICE_CATEGORIES } from '../data/services';

const AddService = () => {
  const [form, setForm] = useState({
    title: '', description: '', category: '', location: '', price: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/services', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Service added successfully!');
      setForm({ title: '', description: '', category: '', location: '', price: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding service');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
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
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
