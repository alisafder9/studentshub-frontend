import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList'; // Assuming you have this component
import Navbar from './components/Navbar';
import ForgotPassword from './components/ForgotPassword';

const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    if (token && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/all-students');
    }
  }, [navigate, location.pathname]);

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthChecker>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-student"
            element={
              <PrivateRoute>
                <AddStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-students"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthChecker>
    </Router>
  );
};

export default App;