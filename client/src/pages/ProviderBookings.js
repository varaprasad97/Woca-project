import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviderBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // For demo purposes, let's create some mock bookings if no token
        const token = localStorage.getItem('token');
        if (!token) {
          // Mock data for demonstration
          const mockBookings = [
            {
              _id: '1',
              service: { title: 'Professional Plumbing Service', category: 'Home' },
              user: { name: 'John Doe', email: 'john@example.com' },
              date: '2024-01-15',
              time: '10:00 AM',
              status: 'Pending',
              address: '123 Main St, Hyderabad',
              createdAt: new Date()
            },
            {
              _id: '2',
              service: { title: 'Home Cleaning Service', category: 'Home' },
              user: { name: 'Jane Smith', email: 'jane@example.com' },
              date: '2024-01-18',
              time: '2:00 PM',
              status: 'Accepted',
              address: '456 Oak Ave, Bangalore',
              createdAt: new Date()
            },
            {
              _id: '3',
              service: { title: 'Web Development Services', category: 'Technology' },
              user: { name: 'Mike Johnson', email: 'mike@example.com' },
              date: '2024-01-20',
              time: '11:00 AM',
              status: 'Completed',
              address: '789 Tech St, Mumbai',
              createdAt: new Date()
            }
          ];
          setBookings(mockBookings);
          return;
        }

        const { data } = await axios.get('/api/bookings/provider', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(data);
      } catch (err) {
        console.error('Error fetching provider bookings:', err);
        setError('Failed to load booking requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProviderBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // For demo, just update local state
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
        return;
      }

      await axios.put(`/api/bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      
      // Show success message
      const statusMessages = {
        'Accepted': 'Booking accepted successfully!',
        'Completed': 'Booking marked as completed!',
        'Cancelled': 'Booking cancelled successfully!'
      };
      
      alert(statusMessages[status] || 'Status updated successfully!');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusActions = (booking) => {
    switch (booking.status) {
      case 'Pending':
        return (
          <div className="flex space-x-2">
            <button 
              onClick={() => updateStatus(booking._id, 'Accepted')} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Accept
            </button>
            <button 
              onClick={() => updateStatus(booking._id, 'Cancelled')} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Decline
            </button>
          </div>
        );
      case 'Accepted':
        return (
          <button 
            onClick={() => updateStatus(booking._id, 'Completed')} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Mark Complete
          </button>
        );
      default:
        return null;
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Requests</h1>
          <p className="text-gray-600">Manage incoming service requests from customers</p>
        </div>

        {error && (
          <div className="card p-4 mb-6 bg-red-50 border-red-200">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No booking requests</h3>
            <p className="text-gray-600 mb-6">You'll see incoming service requests here when customers book your services.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              View Services
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="card p-6 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {booking.service.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        👤 {booking.user.name}
                      </span>
                      <span className="flex items-center">
                        📧 {booking.user.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        📅 {formatDate(booking.date)}
                      </span>
                      <span className="flex items-center">
                        🕐 {booking.time}
                      </span>
                      <span className="flex items-center">
                        📍 {booking.address}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Requested on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm px-4 py-2">
                      View Details
                    </button>
                    {getStatusActions(booking)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderBookings;
