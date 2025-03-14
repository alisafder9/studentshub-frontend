import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment'; // Import moment.js for date manipulation
import './Register.css'; // Import the CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setError('');
    setSuccess('');
    setLoading(true); // Set loading to true when form is submitted

    // Format dob to 'YYYY-MM-DD'
    const formattedDob = moment(dob).format('YYYY-MM-DD');

    // Validate dob (ensure it's not today or in the future)
    const dobMoment = moment(formattedDob);
    const today = moment().startOf('day');

    if (dobMoment.isSame(today) || dobMoment.isAfter(today)) {
      setError('Enter a valid date of birth');
      setLoading(false); // Reset loading to false if there's an error
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password, dob: formattedDob });
      console.log(response.data);
      setSuccess('User registered successfully!');
      setLoading(false); // Reset loading to false after successful registration
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after successful registration
    } catch (err) {
      console.error(err); // Log the error for debugging
      if (err.response && err.response.data.message === "User already exists, please login") {
        setError('User already exists, please login');
      } else {
        setError('Enter valid details');
      }
      setLoading(false); // Reset loading to false if there's an error
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="register-container"> {/* Add custom CSS class */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Register'}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <span>Already have an account? <Link to="/login">Login here</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;