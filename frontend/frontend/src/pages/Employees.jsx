import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
      setLoading(false);
    } catch {
      setError("Failed to fetch employees");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("employees/", form);
      setForm({ employee_id:"", full_name:"", email:"", department:"" });
      fetchEmployees();
    } catch (err) {
      setError("Error adding employee");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`employees/${id}/`);
    fetchEmployees();
  };

  if (loading) return <Loader />;

  return (
    <>
      <h2 className="mb-4">Employees</h2>

      {error && <ErrorMessage message={error} />}

      <div className="card mb-4 shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <input className="form-control" placeholder="Employee ID"
                value={form.employee_id}
                onChange={(e)=>setForm({...form, employee_id:e.target.value})}/>
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Full Name"
                value={form.full_name}
                onChange={(e)=>setForm({...form, full_name:e.target.value})}/>
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Email"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}/>
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Department"
                value={form.department}
                onChange={(e)=>setForm({...form, department:e.target.value})}/>
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="alert alert-info">No employees found</div>
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        onClick={()=>handleDelete(emp.id)}
                        className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Employees;