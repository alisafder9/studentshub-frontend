import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const AddStudent = () => {
  const [admissionDate, setAdmissionDate] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [grade, setGrade] = useState('');
  const [nationality, setNationality] = useState('');
  const [fatherCnic, setFatherCnic] = useState('');
  const [fatherContact, setFatherContact] = useState('');
  const [address, setAddress] = useState('');
  const [slc, setSlc] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error or success messages
    setError('');
    setSuccess('');

    // Check if all fields are filled
    if (!admissionDate || !admissionNo || !name || !fatherName || !dob || !gender || !grade || !nationality || !fatherCnic || !fatherContact || !address || !status) {
      setError('All fields are required.');
      return;
    }

    // Validate that dob is earlier than admissionDate
    if (moment(dob).isAfter(moment(admissionDate)) || moment(dob).isSame(moment(admissionDate))) {
      setError('Date of birth must be earlier than the admission date.');
      alert('Date of birth must be earlier than the admission date.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    try {
      // Send POST request to backend to add student
      const response = await axios.post('https://studentshub-backend.vercel.app/api/students/addstudent', {
        admission_date: admissionDate,
        admission_no: admissionNo,
        name,
        father_name: fatherName,
        dob,
        gender,
        grade,
        nationality,
        father_cnic: fatherCnic,
        father_contact: fatherContact,
        address,
        status,
        slc,
        issue_date: issueDate
      });

      // Show success message if student is added
      setSuccess(response.data.message);
      // Clear the error message after 2 seconds
      setTimeout(() => setSuccess(''), 2000);
      setAdmissionDate('');
      setAdmissionNo('');
      setName('');
      setFatherName('');
      setDob('');
      setGender('');
      setGrade('');
      setNationality('');
      setFatherCnic('');
      setFatherContact('');
      setAddress('');
      setSlc('');
      setIssueDate('');
      setStatus('');
    } catch (err) {
      // Handle errors, e.g., server errors or validation errors
      setError(err.response?.data?.message || 'Error adding student.');
    }

    // Clear the error message after 2 seconds
    setTimeout(() => setError(''), 2000);
  };

  return (
    <div className="container">
      <h2 className='my-3'>Add Student</h2>

      {/* Display error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display success message */}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form to add a new student */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-3">
            <label htmlFor="admissionDate" className="form-label">Admission Date</label>
            <input
              type="date"
              className="form-control"
              id="admissionDate"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="admissionNo" className="form-label">Admission No</label>
            <input
              type="number"
              className="form-control"
              id="admissionNo"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
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

          <div className="mb-3 col-md-3">
            <label htmlFor="fatherName" className="form-label">Father Name</label>
            <input
              type="text"
              className="form-control"
              id="fatherName"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
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

          <div className="mb-3 col-md-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="grade" className="form-label">Grade</label>
            <select
              className="form-control"
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
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

          <div className="mb-3 col-md-3">
            <label htmlFor="nationality" className="form-label">Nationality</label>
            <select
              className="form-control"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            >
              <option value="">Select Nationality</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Afghani">Afghani</option>
            </select>
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="fatherCnic" className="form-label">Father CNIC</label>
            <input
              type="text"
              className="form-control"
              id="fatherCnic"
              placeholder='without dashes'
              value={fatherCnic}
              onChange={(e) => setFatherCnic(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="fatherContact" className="form-label">Father Contact</label>
            <input
              type="text"
              className="form-control"
              id="fatherContact"
              placeholder='03xx1234567'
              value={fatherContact}
              onChange={(e) => setFatherContact(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="slc" className="form-label">SLC</label>
            <select
              className="form-control"
              id="slc"
              value={slc}
              onChange={(e) => setSlc(e.target.value)}
              disabled={status === 'Active' || status === ''}
            >
              <option value="">Took SLC</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-3 col-md-3">
            <label htmlFor="issue_date" className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              id="issue_date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              disabled={status === 'Active' || status === '' || slc === 'No' || slc === ''}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-4">Add Student</button>

      </form>

    </div>
  );
};

export default AddStudent;
