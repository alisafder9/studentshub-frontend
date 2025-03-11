import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaCalendar, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        dob: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const email = localStorage.getItem('email') || sessionStorage.getItem('email');
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!email || !token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`https://studentshub-backend.vercel.app/api/users/profile?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUser({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    dob: data.dob
                });
            } catch (error) {
                setError('Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        const { name, password, dob } = user;
        const email = localStorage.getItem('email') || sessionStorage.getItem('email');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!name || !password || !dob) {
            setError('Name and date of birth are required');
            return;
        }

        try {
            const response = await fetch(`https://studentshub-backend.vercel.app/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password, dob }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setSuccess('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            setError('Error updating profile');
        }
    };

    if (loading) {
        return <Container className="mt-5 text-center">Loading...</Container>;
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">
                <FaUser className="me-2" /> User Profile
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form>
                {/* Name Field */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <FaUser className="me-2" /> Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </Form.Group>

                {/* Email Field (Non-Editable) */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <FaEnvelope className="me-2" /> Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        readOnly
                    />
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <FaLock className="me-2" /> Password
                    </Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePasswordVisibility}
                            style={{height: '37px'}}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                {/* Date of Birth Field */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <FaCalendar className="me-2" /> Date of Birth
                    </Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        value={user.dob.split('T')[0]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </Form.Group>

                {/* Edit/Save Buttons */}
                {isEditing ? (
                    <Button variant="success" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </Form>
        </Container>
    );
};

export default ProfilePage;
