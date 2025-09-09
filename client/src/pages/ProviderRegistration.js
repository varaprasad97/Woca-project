import React, { useState } from 'react';
import axios from '../utils/axios';
import { SERVICE_CATEGORIES } from '../data/services';

const ProviderRegistration = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    price: '',
    priceRange: '',
    experience: '',
    qualifications: '',
    availability: ''
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((img) => {
        formData.append('images', img);
      });
      // Send as multipart/form-data
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Service submitted for approval!');
      setForm({
        title: '', description: '', category: '', location: '', price: '', priceRange: '', experience: '', qualifications: '', availability: ''
      });
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Provider Service Registration</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required className="w-full px-3 py-2 border rounded">
              <option value="">Select category</option>
              {Object.keys(SERVICE_CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <input type="text" name="priceRange" value={form.priceRange} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input type="text" name="experience" value={form.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
            <input type="text" name="qualifications" value={form.qualifications} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <input type="text" name="availability" value={form.availability} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (up to 5)</label>
            <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(images).map((img, idx) => (
                  <span key={idx} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">{img.name}</span>
                ))}
              </div>
            )}
          </div>
          {success && <div className="text-green-600 font-medium">{success}</div>}
          {error && <div className="text-red-600 font-medium">{error}</div>}
          <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Submitting...' : 'Submit Service'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration; 