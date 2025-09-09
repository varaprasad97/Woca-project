import React, { useState } from 'react';

const PaymentSelection = ({ onPaymentSelect, selectedPayment, totalAmount }) => {
  const [showCardDetails, setShowCardDetails] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      description: 'Pay using UPI apps like Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Pay using Visa, MasterCard, RuPay cards',
      popular: false
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: '🏦',
      description: 'Pay using your bank account',
      popular: false
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: '💰',
      description: 'Pay using Paytm, PhonePe, Amazon Pay',
      popular: false
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay in cash when service is completed',
      popular: false
    }
  ];

  const handlePaymentSelect = (paymentMethod) => {
    onPaymentSelect(paymentMethod);
    if (paymentMethod.id === 'card') {
      setShowCardDetails(true);
    } else {
      setShowCardDetails(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Payment Method</h3>
        <p className="text-sm text-gray-600">Choose your preferred payment option</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handlePaymentSelect(method)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedPayment?.id === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{method.icon}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{method.name}</span>
                    {method.popular && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPayment?.id === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedPayment?.id === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Form */}
      {showCardDetails && selectedPayment?.id === 'card' && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Card Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* UPI Details */}
      {selectedPayment?.id === 'upi' && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">UPI Payment</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              Pay using any UPI app like Google Pay, PhonePe, Paytm
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <span>UPI ID:</span>
              <span className="font-medium">woca@paytm</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Summary */}
      {selectedPayment && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Amount:</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-medium">₹50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-medium">₹{(totalAmount * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-lg">₹{(totalAmount + 50 + (totalAmount * 0.18)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-green-600">🔒</div>
          <div>
            <h5 className="text-sm font-medium text-green-800">Secure Payment</h5>
            <p className="text-sm text-green-700 mt-1">
              Your payment information is encrypted and secure. We use industry-standard SSL encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection; 