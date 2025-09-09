import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentSelection from '../components/PaymentSelection';
import axios from '../utils/axios';

const BookService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    specialInstructions: ''
  });

  useEffect(() => {
    // Get service details from localStorage (from Book Now button)
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      try {
        const serviceData = JSON.parse(selectedService);
        setService(serviceData);
      } catch (error) {
        console.error('Error parsing selected service:', error);
        // Clear invalid data
        localStorage.removeItem('selectedService');
      }
    }
    setIsLoading(false);
  }, [serviceId]);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleNextStep = () => {
    if (step === 1 && bookingData.date && bookingData.time && bookingData.address) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const calculateTotalAmount = () => {
    if (!service) return 0;
    const baseAmount = service.price || 0;
    const platformFee = Math.round(baseAmount * 0.05); // 5% platform fee
    const gst = Math.round((baseAmount + platformFee) * 0.18); // 18% GST
    return baseAmount + platformFee + gst;
  };

  const handleSubmit = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    try {
      setIsLoading(true);

      const totalAmount = calculateTotalAmount();
      const baseAmount = service.price || 0;
      const platformFee = Math.round(baseAmount * 0.05);
      const gst = Math.round((baseAmount + platformFee) * 0.18);

      // Create booking data
      const bookingPayload = {
        serviceId: service._id || 'mock-service-id',
        providerId: service.providerId || 'mock-provider-id', // In real app, this would come from service data
        bookingDetails: {
          date: new Date(bookingData.date),
          time: bookingData.time,
          address: bookingData.address,
          specialInstructions: bookingData.specialInstructions
        },
        payment: {
          method: selectedPayment,
          amount: baseAmount,
          platformFee: platformFee,
          gst: gst,
          totalAmount: totalAmount,
          status: 'completed' // Simulating successful payment
        }
      };

      // Send booking to backend
      const response = await axios.post('/api/bookings', bookingPayload);

      if (response.data) {
        alert('Booking created successfully! Provider will be notified.');
        localStorage.removeItem('selectedService'); // Clean up
        navigate('/my-bookings'); // Redirect to bookings page
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Plumbing': '🚰',
      'Electrical': '⚡',
      'Carpentry': '🔨',
      'Home Cleaning': '🧹',
      'Appliance Repair': '🔧',
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
      'Consultancy': '💼',
      'default': '🔧'
    };
    return icons[category] || icons.default;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Service</h1>
          <p className="mt-2 text-gray-600">Complete your booking in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Booking Details</span>
            </div>
            <div className={`w-16 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Summary</h2>
              
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{getCategoryIcon(service.category)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.category}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-medium">₹{service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (5%):</span>
                  <span className="font-medium">₹{Math.round(service.price * 0.05)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="font-medium">₹{Math.round((service.price + Math.round(service.price * 0.05)) * 0.18)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotalAmount()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What's Included:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Professional service provider</li>
                  <li>• Quality guaranteed work</li>
                  <li>• 24/7 customer support</li>
                  <li>• Secure payment processing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {step === 1 ? (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: Booking Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Date *
                      </label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Address *
                      </label>
                      <textarea
                        value={bookingData.address}
                        onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                        rows={3}
                        placeholder="Enter the address where you need the service"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        value={bookingData.specialInstructions}
                        onChange={(e) => setBookingData({...bookingData, specialInstructions: e.target.value})}
                        rows={3}
                        placeholder="Any specific requirements or instructions for the service provider"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      disabled={!bookingData.date || !bookingData.time || !bookingData.address}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: Payment</h2>
                  
                  <PaymentSelection
                    selectedPayment={selectedPayment}
                    onPaymentSelect={handlePaymentSelect}
                    totalAmount={calculateTotalAmount()}
                  />

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handleBackStep}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedPayment || isLoading}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
