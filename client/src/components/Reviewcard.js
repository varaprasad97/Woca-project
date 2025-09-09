import React from 'react';

const Reviewcard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {review.user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
          </div>
          
          {/* Review Content */}
          <p className="text-gray-700 leading-relaxed mb-3">
            {review.comment}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Verified Customer</span>
            <span>•</span>
            <span>Helpful</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewcard;
