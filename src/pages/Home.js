import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [employees,setEmployees] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:8080/api/employees")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error Fetching employees :",error))

  },[])

  const deleteEmployee = (id) =>{
    axios.delete(`http://localhost:8080/api/employees/${id}`)
    .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
    .catch(error => console.error("Error deleting employee:",error))
  }

  return(
    <div className="container">
      <h2 className='mb-4'>Employee List</h2>
      <table className='table table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>  
        <tbody>
          {employees.map(emp =>(

              <tr key={emp.id}>

                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <Link to={`/edit/${emp.id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                    <button onClick={() => deleteEmployee(emp.id)} className='btn btn-danger btn-sm'>Delete </button>
                  </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home
