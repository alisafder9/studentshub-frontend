import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const UpdateStudent = ({ student, onUpdate }) => {
    const [formData, setFormData] = useState({
        admission_date: '',
        admission_no: '',
        name: '',
        father_name: '',
        dob: '',
        gender: '',
        grade: '',
        nationality: '',
        father_cnic: '',
        father_contact: '',
        address: '',
        status: '',
        slc: '',
        issue_date: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (student) {
            setFormData({
                ...student,
                dob: student.dob ? student.dob.split('T')[0] : '',
                admission_date: student.admission_date ? student.admission_date.split('T')[0] : '',
                issue_date: student.issue_date ? student.issue_date.split('T')[0] : ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/api/students/${student.admission_no}`, formData);
            setMessage(response.data.message);
            setTimeout(() => onUpdate(formData), 1000);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Update Student Record</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label>Admission Date:</label>
                    <input
                        type="date"
                        name="admission_date"
                        value={formData.admission_date}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Admission Number:</label>
                    <input
                        type="text"
                        name="admission_no"
                        value={formData.admission_no}
                        onChange={handleChange}
                        disabled={true}
                    />
                </div>
                <div className='mb-2'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Father Name:</label>
                    <input
                        type="text"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label>Grade:</label>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                    >
                        <option value="">Select Grade</option>
                        <option value="K.G">K.G</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label>Nationality:</label>
                    <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                    >
                        <option value="">Select Nationality</option>
                        <option value="Pakistani">Pakistani</option>
                        <option value="Afghani">Afghani</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label>Father CNIC:</label>
                    <input
                        type="text"
                        name="father_cnic"
                        value={formData.father_cnic}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Father Contact:</label>
                    <input
                        type="text"
                        name="father_contact"
                        value={formData.father_contact}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label>SLC:</label>
                    <select
                        name="slc"
                        value={formData.slc}
                        onChange={handleChange}
                        disabled={formData.status === '' || formData.status === 'Active'}
                    >
                        <option value="">Took SLC</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label>Issue Date:</label>
                    <input
                        type="date"
                        name="issue_date"
                        value={formData.issue_date}
                        onChange={handleChange}
                        disabled={formData.slc === '' || formData.slc === 'No' || formData.status === '' || formData.status === 'Active'}
                    />
                </div>
                <button className='btn btn-primary' type="submit">Update Student</button>
            </form>
            {message && <p className='text-success'>{message}</p>}
        </div>
    );
};

export default UpdateStudent;