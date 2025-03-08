import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {

  const API_BASE_URL = "https://employeemanagement-production-c1aa.up.railway.app";
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: "", department: "", salary: "" });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error("Error fetching employee:", error));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_BASE_URL}/api/employees/${id}`, employee)
      .then(() => navigate("/"))
      .catch(error => console.error("Error updating employee:", error));
  };

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={employee.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-control" value={employee.department} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input type="number" name="salary" className="form-control" value={employee.salary} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
