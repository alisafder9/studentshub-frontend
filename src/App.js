import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList'; // Assuming you have this component
import NavbarComponent from './components/Navbar';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './components/Profile';
import BirthCertificate from './components/BirthCertificate';

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
  const [filters, setFilters] = useState({
    gradeFilter: '',
    genderFilter: '',
    nationalityFilter: '',
    statusFilter: 'Active',
    ageFilter: ''
  });

  const [filtersApplied, setFiltersApplied] = useState(false); // Track if filters are applied

  const applyFilters = () => {
    setFiltersApplied(true); // Indicate that filters have been applied
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <Router>
      <AuthChecker>
        <div className="no-print">
          <NavbarComponent filters={filters} onFilterChange={handleFilterChange} onApplyFilters={applyFilters} />
        </div>
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
                <StudentList filters={filters} filtersApplied={filtersApplied} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/birthCertificate"
            element={
              <PrivateRoute>
                <BirthCertificate />
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