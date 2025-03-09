import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      const email = localStorage.getItem('email') || sessionStorage.getItem('email');
  
      if (!email) {
        setUserName("Failed to load username");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        const response = await fetch(`https://studentshub-backend.vercel.app/api/users/name?email=${email}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const text = await response.text();

        if (response.ok) {
          try {
            const data = JSON.parse(text);
            if (data.name) {
              setUserName(data.name);
            } else {
              setUserName("Failed to load username");
            }
          } catch (jsonError) {
            setUserName("Failed to load username");
          }
        } else {
          setUserName("Failed to load username");
        }
      } catch (error) {
        setUserName("Failed to load username");
      }

      setLoading(false);
    };

    if (token) {
      fetchUserName();
    } else {
      setLoading(false);
    }

  }, [token]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token') || sessionStorage.removeItem('token');
      localStorage.removeItem('email') || sessionStorage.removeItem('email');
      navigate('/login');
    }
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">StudentsHub</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/all-students">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/add-student">Add Student</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-nav my-sm-2">
        <span className="navbar-text mx-lg-2 mx-sm-0">
          Welcome! {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">Guest</span> : (userName || "Failed to load username")}
        </span>
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
