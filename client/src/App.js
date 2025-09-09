import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServiceList from './pages/ServiceList';
import ServiceDetails from './pages/ServiceDetails';
import AddService from './pages/Addservice';
import EditService from './pages/EditService';
import MyBookings from './pages/MyBookings';
import ChatPage from './pages/ChatPage';
import Home from './pages/Home';
import UserRegistration from './pages/UserRegistration';
import ProviderRegistration from './pages/ProviderRegistration';
import ServiceBooking from './pages/ServiceBooking';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderServiceManagement from './pages/ProviderServiceManagement';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/services"
          element={(
            <ProtectedRoute>
              <ServiceList />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/service/:id"
          element={(
            <ProtectedRoute>
              <ServiceDetails />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/add-service"
          element={(
            <ProtectedRoute>
              <AddService />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/edit-service/:id"
          element={(
            <ProtectedRoute>
              <EditService />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/my-bookings"
          element={(
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/chat"
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/provider-registration"
          element={(
            <ProtectedRoute>
              <ProviderRegistration />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/book/:serviceId"
          element={(
            <ProtectedRoute>
              <ServiceBooking />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/provider-dashboard"
          element={(
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/provider-services"
          element={(
            <ProtectedRoute>
              <ProviderServiceManagement />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
