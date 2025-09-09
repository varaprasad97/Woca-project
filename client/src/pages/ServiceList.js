import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMockServices, SERVICE_CATEGORIES } from '../data/services';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user location from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserLocation(user.location);
    }

    // Load services from localStorage or generate mock data
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        setServices(parsedServices);
      } catch (error) {
        console.error('Error parsing stored services:', error);
        const mockServices = generateMockServices();
        setServices(mockServices);
        localStorage.setItem('services', JSON.stringify(mockServices));
      }
    } else {
      const mockServices = generateMockServices();
      setServices(mockServices);
      localStorage.setItem('services', JSON.stringify(mockServices));
    }
    setLoading(false);
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesLocation = !selectedLocation || 
                           (service.location && service.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get unique locations from services
  const availableLocations = [...new Set(services.map(service => service.location).filter(Boolean))];

  const handleServiceClick = (service) => {
    // Store selected service for booking
    localStorage.setItem('selectedService', JSON.stringify(service));
    navigate(`/book/${service._id}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Home Cleaning': 'bg-blue-100 text-blue-800',
      'Appliance Repair': 'bg-green-100 text-green-800',
      'Plumbing': 'bg-purple-100 text-purple-800',
      'Electrical': 'bg-yellow-100 text-yellow-800',
      'Carpentry': 'bg-red-100 text-red-800',
      'Home Painting': 'bg-indigo-100 text-indigo-800',
      'Landscaping': 'bg-pink-100 text-pink-800',
      'Pest Control': 'bg-gray-100 text-gray-800',
      'Moving/Logistics': 'bg-orange-100 text-orange-800',
      'Car Wash/Detailing': 'bg-teal-100 text-teal-800',
      'Personal Trainer': 'bg-cyan-100 text-cyan-800',
      'Tutoring': 'bg-emerald-100 text-emerald-800',
      'Beauty Services': 'bg-rose-100 text-rose-800',
      'Babysitting': 'bg-violet-100 text-violet-800',
      'Pet Care': 'bg-amber-100 text-amber-800',
      'IT Support': 'bg-slate-100 text-slate-800',
      'Translation': 'bg-lime-100 text-lime-800',
      'Handyman': 'bg-fuchsia-100 text-fuchsia-800',
      'Event Planning': 'bg-sky-100 text-sky-800',
      'Consultancy': 'bg-stone-100 text-stone-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Home Cleaning': '🧽',
      'Appliance Repair': '🔧',
      'Plumbing': '🚰',
      'Electrical': '⚡',
      'Carpentry': '🔨',
      'Home Painting': '🎨',
      'Landscaping': '🌿',
      'Pest Control': '🐜',
      'Moving/Logistics': '📦',
      'Car Wash/Detailing': '🚗',
      'Personal Trainer': '💪',
      'Tutoring': '📚',
      'Beauty Services': '💄',
      'Babysitting': '👶',
      'Pet Care': '🐕',
      'IT Support': '💻',
      'Translation': '🌐',
      'Handyman': '🛠️',
      'Event Planning': '🎉',
      'Consultancy': '💼'
    };
    return icons[category] || '⚙️';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚙️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">All Services</h1>
          </div>
          <p className="mt-2 text-gray-600">Find and book professional services</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showSearchDropdown && searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">
                      Available Services ({filteredServices.length})
                    </p>
                  </div>
                  {filteredServices.slice(0, 10).map((service) => (
                    <div
                      key={service._id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                      onClick={() => {
                        setSearchTerm(service.title);
                        setShowSearchDropdown(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.title}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">₹{service.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📂</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {Object.keys(SERVICE_CATEGORIES).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📍</span>
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {userLocation && (
                    <option value={userLocation.city}>
                      📍 My Location ({userLocation.city})
                    </option>
                  )}
                  {availableLocations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear Filters</span>
              </button>
            </div>

            {/* Reload Services */}
            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('services');
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <span>🔄</span>
                <span>Reload Services</span>
              </button>
            </div>
          </div>
        </div>

        {/* All Service Categories */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-bold text-gray-900">All Service Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(SERVICE_CATEGORIES).map(([category, data]) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">{getCategoryIcon(category)}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl">🎯</span>
              <h2 className="text-2xl font-bold text-gray-900">Available Services ({filteredServices.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">📍</span>
                        <span>{service.location}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">₹{service.price}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleServiceClick(service)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>📅</span>
                        <span>Book Now</span>
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                        <span>👁️</span>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-500 text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
