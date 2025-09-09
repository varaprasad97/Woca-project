import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { SERVICE_CATEGORIES } from '../data/services';

const ProviderServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/services/my');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${serviceId}`);
        alert('Service deleted successfully!');
        fetchMyServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editingService).forEach(([key, value]) => {
        if (key !== 'images' && key !== '_id' && key !== 'createdBy' && key !== 'createdAt' && key !== 'updatedAt') {
          formData.append(key, value);
        }
      });
      
      // Handle existing images
      if (editingService.images) {
        formData.append('existingImages', JSON.stringify(editingService.images));
      }

      await axios.put(`/api/services/${editingService._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Service updated successfully!');
      setShowEditForm(false);
      setEditingService(null);
      fetchMyServices();
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <p className="mt-2 text-gray-600">Manage your uploaded services</p>
        </div>

        {/* Add New Service Button */}
        <div className="mb-6">
          <a
            href="/provider-registration"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <span className="mr-2">+</span>
            Add New Service
          </a>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow p-6">
              {service.images && service.images.length > 0 && (
                <img
                  src={service.images[0]}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">{service.description}</p>
              <p className="text-sm text-gray-500 mb-2">Category: {service.category}</p>
              <p className="text-sm text-gray-500 mb-2">Location: {service.location}</p>
              <p className="text-sm text-gray-500 mb-4">Price: ₹{service.price}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first service.</p>
            <a
              href="/provider-registration"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Service
            </a>
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      {showEditForm && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Service</h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingService(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select category</option>
                    {Object.keys(SERVICE_CATEGORIES).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={editingService.location}
                    onChange={(e) => setEditingService({...editingService, location: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                    <input
                      type="number"
                      value={editingService.price}
                      onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <input
                      type="text"
                      value={editingService.priceRange || ''}
                      onChange={(e) => setEditingService({...editingService, priceRange: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingService.experience || ''}
                    onChange={(e) => setEditingService({...editingService, experience: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={editingService.qualifications || ''}
                    onChange={(e) => setEditingService({...editingService, qualifications: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <input
                    type="text"
                    value={editingService.availability || ''}
                    onChange={(e) => setEditingService({...editingService, availability: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingService(null);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderServiceManagement; 