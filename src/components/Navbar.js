import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaHome, FaUserPlus, FaUser } from 'react-icons/fa'; // Import icons

const NavbarComponent = ({ filters, onFilterChange, onApplyFilters }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility
  const [logoutLoading, setLogoutLoading] = useState(false); // State to control logout loading

  const handleApplyFilters = () => {
    onApplyFilters(); // Apply filters
    setShowOffcanvas(false); // Close the offcanvas
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setLogoutLoading(true); // Set logout loading to true
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('email');
      sessionStorage.removeItem('email');
      setTimeout(() => {
        setLogoutLoading(false); // Reset logout loading to false
        navigate('/login');
      }, 1000); // Simulate a delay for the logout process
    }
  };

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar expand={false} className="bg-dark mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" className="text-white">StudentsHub</Navbar.Brand>
          {/* Hamburger button to toggle Offcanvas */}
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShowOffcanvas(true)}
            className="bg-white"
          />
          {/* Offcanvas for mobile navigation */}
          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="start" // Slide in from the right
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            className="bg-dark text-white"
          >
            <Offcanvas.Header closeButton className='custom-offcanvas-header'>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="custom-offcanvas-title">
                StudentsHub
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/all-students"
                  onClick={() => setShowOffcanvas(false)}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <h6>
                    <FaHome className="me-2" /> {/* Add Home icon */}
                    Dashboard
                  </h6>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/add-student"
                  onClick={() => setShowOffcanvas(false)}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <h6>
                    <FaUserPlus className="me-2" /> {/* Add UserPlus icon */}
                    Add Student
                  </h6>
                </Nav.Link>
                <hr />
                {/* Conditionally render filters based on the current route */}
                {(location.pathname !== '/add-student') && (location.pathname !== '/profile') && (
                  <div>
                    <h6>Filters</h6>
                    <div className="mt-3">
                      <select
                        id="gradeFilter"
                        value={filters.gradeFilter}
                        onChange={(e) => onFilterChange('gradeFilter', e.target.value)}
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
                        value={filters.genderFilter}
                        onChange={(e) => onFilterChange('genderFilter', e.target.value)}
                        placeholder="Filter by gender"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>

                      <input
                        type="number"
                        id="ageFilter"
                        value={filters.ageFilter}
                        onChange={(e) => onFilterChange('ageFilter', e.target.value)}
                        placeholder="Type age"
                        className='mx-1'
                        style={{ height: '25px' }}
                      />

                      <select
                        id="nationalityFilter"
                        value={filters.nationalityFilter}
                        onChange={(e) => onFilterChange('nationalityFilter', e.target.value)}
                        placeholder="Filter by nationality"
                        className=''
                      >
                        <option value="">Select Nationality</option>
                        <option value="Pakistani">Pakistani</option>
                        <option value="Afghani">Afghani</option>
                      </select>

                      <select
                        id="statusFilter"
                        value={filters.statusFilter}
                        onChange={(e) => onFilterChange('statusFilter', e.target.value)}
                        placeholder="Filter by status"
                        className='mx-1'
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={handleApplyFilters} className="mt-2 mb-3">
                      Apply Filters
                    </Button>
                    <hr />
                  </div>
                )}
                <div className="d-flex-row">
                  {/* Replace "Welcome" with a NavLink to the profile page */}
                  <Nav.Link
                    as={NavLink}
                    to="/profile"
                    onClick={() => setShowOffcanvas(false)}
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    <h6>
                      <FaUser className="me-2" /> {/* Add User icon */}
                      Profile
                    </h6>
                  </Nav.Link>
                  <Button variant="success" onClick={handleLogout} disabled={logoutLoading} className='mt-3'>
                    {logoutLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Logout'}
                  </Button>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
