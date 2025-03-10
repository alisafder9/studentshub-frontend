import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [retrievedPassword, setRetrievedPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any previous error
        setError('');
        setSuccess('');
        setRetrievedPassword('');
        setLoading(true); // Set loading to true when form is submitted

        // Check if all fields are filled
        if (!email || !dob) {
            setError('All fields are required.');
            setLoading(false); // Reset loading to false if there's an error
            return;
        }

        try {
            // Send POST request to backend to recover password
            const response = await axios.post('https://studentshub-frontend.vercel.app/api/users/forgot-password', {
                email,
                dob,
            });

            // Check if the response indicates success
            if (response.data.message) {
                setSuccess('Password retrieved successfully.');
                setRetrievedPassword(response.data.password);
            } else {
                setError(response.data.message || 'Invalid email or date of birth.');
            }

        } catch (err) {
            // Handle errors, e.g., server errors or validation errors
            setError(err.response?.data?.message || 'Error recovering password.');
        }

        setLoading(false); // Reset loading to false after request is complete

        // Clear the error message after 2 seconds
        setTimeout(() => setError(''), 2000);
    };

    return (
        <div className="forgot-password-container"> {/* Add custom CSS class */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className='text-center mb-4'>Forgot Password</h2>

                                {/* Display error message */}
                                {error && <div className="alert alert-danger">{error}</div>}

                                {/* Display success message */}
                                {success && <div className="alert alert-success">{success}</div>}

                                {/* Display retrieved password */}
                                {retrievedPassword && (
                                    <div className="alert alert-info">
                                        Your password is: <strong>{retrievedPassword}</strong>
                                    </div>
                                )}

                                {/* Form to recover password */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Recover Password'}
                                        </button>
                                    </div>
                                </form>
                                <div className="text-center mt-3">
                                    <Link to="/login">You can login here!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
