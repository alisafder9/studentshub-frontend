import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateStudent from './UpdateStudent';
import DeleteStudent from './DeleteStudent';
import { Modal, Button, Pagination } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [gradeFilter, setGradeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5000/api/students/allstudents');
      setStudents(response.data.students);
    };

    if (!isSearch) {
      fetchStudents();
    }
  }, [isSearch]);

  const searchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/search?query=${searchQuery}`);
      setStudents(response.data.students);
      setIsSearch(true);
    } catch (error) {
      console.error("Error searching students", error);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setIsSearch(false);
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedStudent(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const handleUpdate = (updatedStudent) => {
    setStudents(students.map(student => student.admission_no === updatedStudent.admission_no ? updatedStudent : student));
    handleCloseUpdateModal();
  };

  const handleDelete = (admissionNo) => {
    setStudents(students.filter(student => student.admission_no !== admissionNo));
    handleCloseDeleteModal();
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  const handleStudentsPerPageChange = (event) => {
    setStudentsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredStudents = students.filter(student => {
    const age = calculateAge(student.dob);
    return (
      (gradeFilter === '' || student.grade === gradeFilter) &&
      (genderFilter === '' || student.gender === genderFilter) &&
      (nationalityFilter === '' || student.nationality === nationalityFilter) &&
      (statusFilter === '' || student.status === statusFilter) &&
      (ageFilter === '' || age === parseInt(ageFilter))
    );
  });

  const offset = currentPage * studentsPerPage;
  const currentStudents = filteredStudents.slice(offset, offset + studentsPerPage);
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="mt-3">
      <h2 className="text-center mb-4">Dashboard</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by admission number or name"
        style={{ width: '30%', height: '38px' }}
        className='mx-3'
      />
      <button className='mb-2 mx-2 btn btn-primary' onClick={searchStudents}>Search</button>
      <button className='mb-2 btn btn-secondary' onClick={resetSearch}>Reset</button>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="mx-3 mt-2">
          <label htmlFor="studentsPerPage" className='fw-bold'>Students per page: </label>
          <select id="studentsPerPage" value={studentsPerPage} onChange={handleStudentsPerPageChange}>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="mx-3 mt-2">
          <label className='fw-bold'>Filters: </label>
          <select
            id="gradeFilter"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            placeholder="Filter by grade"
            className='mx-1'
          >
            <option value="">Select Grade</option>
            <option value="K.G">K.G</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>

          <select
            id="genderFilter"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            placeholder="Filter by gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="number"
            id="ageFilter"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            placeholder="Type age"
            className='mx-1'
            style={{ height: '25px' }}
          />

          <select
            id="nationalityFilter"
            value={nationalityFilter}
            onChange={(e) => setNationalityFilter(e.target.value)}
            placeholder="Filter by nationality"
            className=''
          >
            <option value="">Select Nationality</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Afghani">Afghani</option>
          </select>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by status"
            className='mx-1'
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="table-scrollable">
        <table className="table table-bordered table-hover">
          <thead className='table-dark'>
            <tr>
              <th>Serial No</th>
              <th>Admission Date</th>
              <th>Admission No</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Current Age</th>
              <th>Gender</th>
              <th>Grade</th>
              <th>Nationality</th>
              <th>Father CNIC</th>
              <th>Father Contact</th>
              <th>Address</th>
              <th>Status</th>
              <th>SLC</th>
              <th>Issue Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='table-black'>
            {currentStudents.map((student, index) => (
              <tr key={student.admission_no}>
                <td>{offset + index + 1}</td>
                <td>{student.admission_date.split('T')[0]}</td>
                <td>{student.admission_no}</td>
                <td>{student.name}</td>
                <td>{student.father_name}</td>
                <td>{student.dob.split('T')[0]}</td>
                <td>{calculateAge(student.dob)}</td>
                <td>{student.gender}</td>
                <td>{student.grade}</td>
                <td>{student.nationality}</td>
                <td>{student.father_cnic}</td>
                <td>{student.father_contact}</td>
                <td>{student.address}</td>
                <td>{student.status}</td>
                <td>{student.slc}</td>
                <td>{student.issue_date ? student.issue_date.split('T')[0] : ''}</td>
                <td>
                  <button className="mx-2 btn btn-warning btn-sm" onClick={() => handleUpdateClick(student)}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-3 my-3">
        <Pagination>
          <Pagination.First onClick={() => handlePageClick(1)} disabled={currentPage === 0} />
          <Pagination.Prev onClick={() => handlePageClick(currentPage)} disabled={currentPage === 0} />
          {[...Array(pageCount)].map((_, index) => (
            <Pagination.Item key={index} active={index === currentPage} onClick={() => handlePageClick(index + 1)}>
              Page {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageClick(currentPage + 2)} disabled={currentPage === pageCount - 1} />
          <Pagination.Last onClick={() => handlePageClick(pageCount)} disabled={currentPage === pageCount - 1} />
        </Pagination>
      </div>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && <UpdateStudent student={selectedStudent} onUpdate={handleUpdate} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && <DeleteStudent student={selectedStudent} onDelete={handleDelete} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;