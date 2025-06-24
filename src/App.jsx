import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import JobListingsPage from './pages/JobListingsPage';
import JobDetailPage from './pages/JobDetailPage';
import UserDashboard from './pages/UserDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import LoginPage from './pages/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('jobseeker'); // 'jobseeker' or 'employer'

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && (
          <Navbar 
            userType={userType} 
            onLogout={() => setIsAuthenticated(false)} 
          />
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginPage 
                  onLogin={(type) => {
                    setIsAuthenticated(true);
                    setUserType(type);
                  }} 
                />
              ) : (
                <Navigate to="/jobs" replace />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              !isAuthenticated ? (
                <SignupPage 
                  onSignup={(type) => {
                    setIsAuthenticated(true);
                    setUserType(type);
                  }} 
                />
              ) : (
                <Navigate to="/jobs" replace />
              )
            } 
          />
          
          {isAuthenticated ? (
            <>
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route 
                path="/dashboard" 
                element={
                  userType === 'jobseeker' ? 
                    <UserDashboard /> : 
                    <EmployerDashboard />
                } 
              />
              <Route path="/" element={<Navigate to="/jobs" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;