import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const DeleteStudent = ({ student, onDelete }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            // Retrieve the token from localStorage or sessionStorage
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
            if (!token) {
                setMessage('User is not authenticated.');
                return;
            }
    
            // Send DELETE request with token verification in the headers
            const response = await axiosInstance.delete(`/api/students/${student.admission_no}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Add the token here
                }
            });
    
            // Handle success: set the message and invoke onDelete
            setMessage(response.data.message);
            setTimeout(() => onDelete(student.admission_no), 1000);
    
        } catch (error) {
            // Handle errors: set the message from the error response
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };
    

    return (
        <div>
            <h2>Delete Student Record</h2>
            <p>Are you sure you want to delete the record for {student.name}?</p>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteStudent;