import React from 'react';

const MessageBubble = ({ message, isSender }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-xs lg:max-w-md ${isSender ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isSender
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.message}</p>
        </div>
        <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${isSender ? 'justify-end' : 'justify-start'}`}>
          <span>{formatTime(message.createdAt)}</span>
          {isSender && (
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Delivered</span>
            </span>
          )}
        </div>
      </div>
      
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mx-2 ${isSender ? 'order-1 bg-gradient-to-br from-blue-500 to-purple-600' : 'order-2 bg-gradient-to-br from-gray-500 to-gray-600'}`}>
        {isSender ? 'U' : 'P'}
      </div>
    </div>
  );
};

export default MessageBubble;
