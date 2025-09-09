import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../data/services';

const ServiceShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  useEffect(() => {
    // Load available services from localStorage
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    setAvailableServices(services);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const findServiceId = (serviceTitle) => {
    const service = availableServices.find(s => s.title === serviceTitle);
    return service ? service._id : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Available Services
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive range of professional services across all categories. Quality guaranteed, trusted providers.
            </p>
          </div>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(SERVICE_CATEGORIES).map(([category, categoryData]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Category Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{categoryData.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                      
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${selectedCategory === category ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Services List */}
              {selectedCategory === category && (
                <div className="border-t border-gray-100">
                  <div className="p-6 space-y-4">
                    {categoryData.services.map((service, index) => {
                      const serviceId = findServiceId(service.title);
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                          serviceId ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-100 opacity-75'
                        }`}>
                          <div className="flex-1">
                            <h4 className={`font-medium ${serviceId ? 'text-gray-900' : 'text-gray-600'}`}>
                              {service.title}
                              {!serviceId && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>}
                            </h4>
                            <p className="text-sm text-gray-500">{service.priceRange}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">₹{service.price}</div>
                            {serviceId ? (
                              <Link 
                                to={`/service/${serviceId}`}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Book Now →
                              </Link>
                            ) : (
                              <span className="text-sm text-gray-400">Not Available</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">19</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">120+</div>
              <div className="text-gray-600">Available Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-gray-600">Major Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Service?</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from our wide range of professional services and get started today.
          </p>
          <Link 
            to="/services" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase; 