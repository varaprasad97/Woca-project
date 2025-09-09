import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      
      {/* Hero Section */}
      <div className="gradient-bg text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm animate-pulse-glow">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 animate-pulse">Woca</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Your trusted platform for professional services. Connect with verified experts, 
              book reliable services, and get things done with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/services" 
                className="btn-primary text-lg px-10 py-5 animate-float"
              >
                Browse Services
              </Link>
              <Link 
                to="/register" 
                className="glass text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">Woca</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We make finding and booking professional services simple, reliable, and secure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover-card animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-pro">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Professionals</h3>
              <p className="text-gray-600 leading-relaxed">
                All service providers are thoroughly vetted and background-checked for your safety and peace of mind.
              </p>
            </div>
            
            <div className="card p-8 text-center hover-card animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-pro">
                <span className="text-white text-xl font-bold">$</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Clear, upfront pricing with no hidden fees. Know exactly what you'll pay before booking.
              </p>
            </div>
            
            <div className="card p-8 text-center hover-card animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-pro">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Safe and secure payment processing with multiple payment options and buyer protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Preview */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From home services to professional expertise, we've got you covered with quality providers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {[
              { name: 'Plumbing', color: 'from-blue-400 to-blue-600', letter: 'P' },
              { name: 'Electrical', color: 'from-yellow-400 to-orange-500', letter: 'E' },
              { name: 'Cleaning', color: 'from-green-400 to-green-600', letter: 'C' },
              { name: 'Car Wash', color: 'from-purple-400 to-purple-600', letter: 'W' },
              { name: 'Tutoring', color: 'from-indigo-400 to-indigo-600', letter: 'T' },
              { name: 'Fitness', color: 'from-red-400 to-red-600', letter: 'F' }
            ].map((service, index) => (
              <div key={index} className="card p-6 text-center hover-card animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-pro`}>
                  <span className="text-white font-bold">{service.letter}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">{service.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/services" 
              className="btn-primary text-lg px-10 py-5"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '19+', label: 'Service Categories' },
              { number: '120+', label: 'Available Services' },
              { number: '8', label: 'Major Cities' },
              { number: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="text-5xl font-bold mb-3 text-yellow-300">{stat.number}</div>
                <div className="text-blue-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust Woca for their service needs. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/register" 
                className="btn-primary text-lg px-10 py-5"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/services" 
                className="btn-secondary text-lg px-10 py-5"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 