import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './PrintStyle.css';

const BirthCertificate = () => {
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdmissionNoChange = (e) => {
    setAdmissionNo(e.target.value);
  };

  const fetchStudentData = async () => {
    if (!admissionNo.trim()) {
      setError('Admission number is required');
      setTimeout(() => setError(null), 2000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (!token) {
        setError('User is not authenticated.');
        return;
      }

      const response = await axios.get(`https://studentshub-backend.vercel.app/api/students/birthcertificate?query=${admissionNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      setStudentData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Student not found!");
      setTimeout(() => setError(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {/* Admission Number Input (Hidden when printing) */}
          <Form className="no-print">
            <Form.Group controlId="admissionNo" className="mb-3">
              <Form.Label>Enter Admission Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admission Number"
                value={admissionNo}
                onChange={handleAdmissionNoChange}
                disabled={loading}
              />
            </Form.Group>
            <Button variant="primary" onClick={fetchStudentData} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Fetch Certificate Data'}
            </Button>
          </Form>

          {/* Show Loading Spinner if data is being fetched */}
          {loading && (
            <div className="text-center mt-4 no-print">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading student data...</p>
            </div>
          )}

          {/* Show Error Message */}
          {error && (
            <div className="text-center mt-4 no-print">
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            </div>
          )}

          {/* Show Certificate if student data is available */}
          {studentData && !loading && !error && (
            <div className="modern-certificate-card">
              {/* Certificate Header */}
              <div className="certificate-header">
                <h2>Birth Certificate</h2>
                <p>Government Public School, Sara Ghundi Thall</p>
              </div>

              {/* Certificate Body */}
              <div className="certificate-body">
                <p>
                  This is to certify that <strong>Mr/Ms. {studentData.name}</strong>,
                  S/D/of <strong>Mr. {studentData.father_name}</strong>, is a student of
                  <strong> Government Public School, Sara Ghundi Thall</strong>,
                  currently enrolled in class <strong>{studentData.grade}</strong>.
                  {studentData.gender === 'male' ? ' He' : ' She'} was born on
                  <strong> {new Date(studentData.dob).toLocaleDateString()}</strong>,
                  and his/her admission number is <strong>{studentData.admission_no}</strong>.
                </p>
              </div>

              {/* Authorized Signature */}
              <div className="certificate-footer">
                <p className="signature">Authorized Signature</p>
                <div className="signature-line"></div>
              </div>

              {/* Print Button (Hidden when printing) */}
              <div className="text-center mt-5 no-print">
                <Button variant="primary" className="btn-lg" onClick={() => window.print()}>
                  Print Certificate
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BirthCertificate;
