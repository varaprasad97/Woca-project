import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bookings/provider');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`/api/bookings/${bookingId}/status`, { status: newStatus });
      fetchBookings(); // Refresh the list
      alert('Booking status updated successfully!');
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  const markNotificationRead = async (bookingId) => {
    try {
      await axios.put(`/api/bookings/${bookingId}/notifications`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error marking notification read:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': '⏳',
      'confirmed': '✅',
      'in-progress': '🔄',
      'completed': '🎉',
      'cancelled': '❌'
    };
    return icons[status] || '📋';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your bookings and customer requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.payment?.amount || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">When customers book your services, they'll appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getStatusIcon(booking.status)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {booking.serviceDetails?.title || 'Service'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Customer: {booking.customer?.name} • {booking.customer?.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {new Date(booking.bookingDetails?.date).toLocaleDateString()} at {booking.bookingDetails?.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            Address: {booking.bookingDetails?.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{booking.payment?.totalAmount || booking.payment?.amount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.payment?.method}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDetails(true);
                          }}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View Details
                        </button>
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking._id, 'in-progress')}
                            className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                          >
                            Start Work
                          </button>
                        )}
                        
                        {booking.status === 'in-progress' && (
                          <button
                            onClick={() => updateBookingStatus(booking._id, 'completed')}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notification indicator */}
                  {!booking.notifications?.providerNotified && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">🔔</span>
                          <span className="text-sm text-blue-800">New booking notification</span>
                        </div>
                        <button
                          onClick={() => markNotificationRead(booking._id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Service Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Service:</strong> {selectedBooking.serviceDetails?.title}</p>
                    <p><strong>Category:</strong> {selectedBooking.serviceDetails?.category}</p>
                    <p><strong>Location:</strong> {selectedBooking.serviceDetails?.location}</p>
                    <p><strong>Base Price:</strong> ₹{selectedBooking.serviceDetails?.price}</p>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Name:</strong> {selectedBooking.customer?.name}</p>
                    <p><strong>Email:</strong> {selectedBooking.customer?.email}</p>
                    <p><strong>Phone:</strong> {selectedBooking.customer?.phone}</p>
                    <p><strong>Address:</strong> {selectedBooking.customer?.address}</p>
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Date:</strong> {new Date(selectedBooking.bookingDetails?.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedBooking.bookingDetails?.time}</p>
                    <p><strong>Service Address:</strong> {selectedBooking.bookingDetails?.address}</p>
                    {selectedBooking.bookingDetails?.specialInstructions && (
                      <p><strong>Special Instructions:</strong> {selectedBooking.bookingDetails.specialInstructions}</p>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Method:</strong> {selectedBooking.payment?.method}</p>
                    <p><strong>Service Amount:</strong> ₹{selectedBooking.payment?.amount}</p>
                    <p><strong>Platform Fee:</strong> ₹{selectedBooking.payment?.platformFee}</p>
                    <p><strong>GST:</strong> ₹{selectedBooking.payment?.gst}</p>
                    <p><strong>Total Amount:</strong> ₹{selectedBooking.payment?.totalAmount}</p>
                    <p><strong>Status:</strong> {selectedBooking.payment?.status}</p>
                  </div>
                </div>

                {/* Status Management */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Management</h3>
                  <div className="flex space-x-3">
                    {selectedBooking.status === 'pending' && (
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, 'confirmed');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Accept Booking
                      </button>
                    )}
                    
                    {selectedBooking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, 'in-progress');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                      >
                        Start Work
                      </button>
                    )}
                    
                    {selectedBooking.status === 'in-progress' && (
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, 'completed');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Mark Complete
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard; 