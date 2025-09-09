import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import LocationSelector from '../components/LocationSelector';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedServices: 0,
    totalReviews: 0,
    memberSince: new Date().toLocaleDateString()
  });

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [location, setLocation] = useState(user?.location || null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch user stats
    fetchUserStats();
  }, [user, navigate]);

  const fetchUserStats = async () => {
    try {
      let totalBookings = 0;
      let completedServices = 0;
      let totalReviews = 0;

      if (user.role === 'provider') {
        // Fetch provider bookings
        try {
          const bookingsResponse = await axios.get('/api/bookings/provider');
          totalBookings = bookingsResponse.data?.length || 0;
          completedServices = bookingsResponse.data?.filter(booking => 
            booking.status === 'completed'
          ).length || 0;
        } catch (error) {
          console.log('No provider bookings found or error fetching bookings');
        }
      } else {
        // Fetch customer bookings
        try {
          const bookingsResponse = await axios.get('/api/bookings/customer');
          totalBookings = bookingsResponse.data?.length || 0;
          completedServices = bookingsResponse.data?.filter(booking => 
            booking.status === 'completed'
          ).length || 0;
        } catch (error) {
          console.log('No customer bookings found or error fetching bookings');
        }
      }

      // Fetch reviews data
      try {
        const reviewsResponse = await axios.get('/api/reviews');
        totalReviews = reviewsResponse.data?.length || 0;
      } catch (error) {
        console.log('No reviews found or error fetching reviews');
      }

      // Get member since date from user creation
      const memberSince = user?.createdAt 
        ? new Date(user.createdAt).toLocaleDateString()
        : new Date().toLocaleDateString();

      setStats({
        totalBookings,
        completedServices,
        totalReviews,
        memberSince
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Set default values if API calls fail
      setStats({
        totalBookings: 0,
        completedServices: 0,
        totalReviews: 0,
        memberSince: new Date().toLocaleDateString()
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update user profile via API
      const response = await axios.put('/api/auth/profile', {
        ...formData,
        location: location
      });
      
      if (response.data) {
        // Update local storage with new user data
        const updatedUser = { ...user, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="card p-8 shadow-pro-lg animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-pro">
                    <span className="text-white text-2xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'provider' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'provider' ? 'Service Provider' : 'Customer'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center space-x-2 ${
                  message.includes('successfully') 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  <span>{message.includes('successfully') ? '✓' : '!'}</span>
                  <span>{message}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                      {user.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                        {user.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="input-field"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                      {user.address}
                    </div>
                  )}
                </div>

                {/* Location Display/Edit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <LocationSelector 
                      onLocationChange={setLocation}
                      initialLocation={location}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                      {user.location ? (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">📍</span>
                            <span>{user.location.city}, {user.location.state}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Pincode: {user.location.pincode}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">No location set</span>
                      )}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats & Actions Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="card p-6 shadow-pro-lg animate-fade-in" style={{animationDelay: '0.1s'}}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">B</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Total Bookings</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{stats.totalBookings}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{stats.completedServices}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Reviews</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{stats.totalReviews}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Member Since</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{stats.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6 shadow-pro-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/services')}
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
                >
                  Browse Services
                </button>
                
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
                >
                  My Bookings
                </button>
                
                {user.role === 'provider' && (
                  <button
                    onClick={() => navigate('/provider-services')}
                    className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
                  >
                    Manage Services
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full p-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Logout Card */}
            <div className="card p-6 shadow-pro-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account</h3>
              <button
                onClick={handleLogout}
                className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-pro"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


