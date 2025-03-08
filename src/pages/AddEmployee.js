import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

  const [employee,setEmployee] = useState({name : "",department : "", salary:""});
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setEmployee({...employee,[e.target.name]: e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:8080/api/employees",employee)
    .then(() => navigate("/"))
    .catch(error => console.error("Error adding employee :",error))
  }
  return (
    <div className='container'>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>

        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input type='text' name="name" className='form-control' onChange={handleChange} required />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Department</label>
          <input type='text' name="department" className='form-control' onChange={handleChange} required />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Salary</label>
          <input type='number' name="salary" className='form-control' onChange={handleChange} required />
        </div>

      <button type='submit' className='btn btn-success'>Add</button>
      </form>
    </div>
  )
}

export default AddEmployee
