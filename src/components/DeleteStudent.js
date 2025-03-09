import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const DeleteStudent = ({ student, onDelete }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/api/students/${student.admission_no}`);
            setMessage(response.data.message);
            setTimeout(() => onDelete(student.admission_no), 1000);
        } catch (error) {
            setMessage(error.response.data.message);
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