
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Home Cleaning': 'bg-blue-100 text-blue-800',
      'Appliance Repair': 'bg-orange-100 text-orange-800',
      'Plumbing': 'bg-cyan-100 text-cyan-800',
      'Electrical': 'bg-yellow-100 text-yellow-800',
      'Carpentry': 'bg-amber-100 text-amber-800',
      'Home Painting': 'bg-pink-100 text-pink-800',
      'Landscaping': 'bg-green-100 text-green-800',
      'Pest Control': 'bg-red-100 text-red-800',
      'Moving/Logistics': 'bg-purple-100 text-purple-800',
      'Car Wash/Detailing': 'bg-indigo-100 text-indigo-800',
      'Personal Trainer': 'bg-emerald-100 text-emerald-800',
      'Tutoring': 'bg-teal-100 text-teal-800',
      'Beauty Services': 'bg-rose-100 text-rose-800',
      'Babysitting': 'bg-amber-100 text-amber-800',
      'Pet Care': 'bg-lime-100 text-lime-800',
      'IT Support': 'bg-slate-100 text-slate-800',
      'Translation': 'bg-violet-100 text-violet-800',
      'Handyman': 'bg-gray-100 text-gray-800',
      'Event Planning': 'bg-fuchsia-100 text-fuchsia-800',
      'Consultancy': 'bg-sky-100 text-sky-800',
      // Legacy categories for backward compatibility
      'Home': 'bg-blue-100 text-blue-800',
      'Education': 'bg-green-100 text-green-800',
      'Auto': 'bg-purple-100 text-purple-800',
      'Health': 'bg-red-100 text-red-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Home Cleaning': '🧹',
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
      'Consultancy': '💼',
      // Legacy categories for backward compatibility
      'Home': '🏠',
      'Education': '📚',
      'Auto': '🚗',
      'Health': '🏥',
      'Technology': '💻',
      'default': '🔧'
    };
    return icons[category] || icons.default;
  };

  return (
    <Link to={`/service/${service._id}`} className="block">
      <div className="card p-6 animate-fade-in group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              {getCategoryIcon(service.category)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {service.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                  {service.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500 flex items-center">
                  📍 {service.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {service.description?.substring(0, 100)}
          {service.description?.length > 100 && '...'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">₹{service.price}</span>
            <span className="text-sm text-gray-500">per service</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>⭐ 4.8</span>
            <span>•</span>
            <span>50+ reviews</span>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default ServiceCard;
