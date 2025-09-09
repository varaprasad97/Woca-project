import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Reviewcard from '../components/Reviewcard';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Added axios import

const MOCK_REVIEWS = [
  { _id: 'r1', serviceId: '1', rating: 5, comment: 'Excellent service! The plumber was professional, on time, and fixed the issue quickly. Highly recommended!', user: { name: 'Alice Johnson' } },
  { _id: 'r2', serviceId: '1', rating: 4, comment: 'Very helpful and knowledgeable. Good quality work at a fair price.', user: { name: 'Bob Smith' } },
  { _id: 'r3', serviceId: '2', rating: 5, comment: 'Amazing tutor! My child\'s math grades improved significantly. Very patient and explains concepts clearly.', user: { name: 'Charlie Brown' } },
  { _id: 'r4', serviceId: '3', rating: 4, comment: 'Great car wash service. My car looks brand new! Will definitely use again.', user: { name: 'David Wilson' } },
];

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        
        // Try to get from localStorage first
        const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
        const service = storedServices.find(s => s._id === serviceId);
        
        if (service) {
          setService(service);
        } else {
          // If not found in localStorage, try API
          const response = await axios.get(`/api/services/${serviceId}`);
          setService(response.data);
        }
        
        // Get reviews
        let storedReviews = [];
        try {
          storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        } catch (error) {
          console.error('Error parsing reviews:', error);
          localStorage.removeItem('reviews');
        }
        
        const serviceReviews = storedReviews.filter(review => review.serviceId === serviceId);
        setReviews(serviceReviews);
        
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleBookNow = () => {
    navigate(`/book/${serviceId}`);
  };

  const handleWriteReview = () => {
    navigate(`/add-review/${serviceId}`);
  };

  const handleViewAllReviews = () => {
    navigate(`/reviews/${serviceId}`);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Home': '🏠',
      'Education': '📚',
      'Auto': '🚗',
      'Health': '🏥',
      'Technology': '💻',
      'default': '🔧'
    };
    return icons[category] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Home': 'bg-blue-100 text-blue-800',
      'Education': 'bg-green-100 text-green-800',
      'Auto': 'bg-purple-100 text-purple-800',
      'Health': 'bg-red-100 text-red-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Header */}
        <div className="card p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                {getCategoryIcon(service.category)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(service.category)}`}>
                    {service.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 flex items-center">
                    📍 {service.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">₹{service.price}</div>
              <div className="text-sm text-gray-500">per service</div>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="font-semibold text-gray-900">{average}</span>
                <span className="text-gray-500">({reviews.length} reviews)</span>
              </div>
              <div className="text-gray-500">•</div>
              <div className="text-gray-500">Posted by: {service.createdBy?.name || 'Professional Provider'}</div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleWriteReview}
                className="btn-secondary"
              >
                Write Review
              </button>
              <button
                onClick={handleBookNow}
                className="btn-primary"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            {reviews.length > 0 && (
              <button
                onClick={handleViewAllReviews}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Reviews →
              </button>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-6">Be the first to review this service!</p>
              <button
                onClick={handleWriteReview}
                className="btn-primary"
              >
                Write First Review
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <Reviewcard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
