import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("employees/")
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("attendance/", form);
    alert("Attendance marked successfully!");
  };

  if (loading) return <Loader />;

  return (
    <>
      <h2 className="mb-4">Mark Attendance</h2>

      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">

            <div className="col-md-4">
              <select className="form-select"
                onChange={(e)=>setForm({...form, employee:e.target.value})}>
                <option>Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <input type="date"
                className="form-control"
                onChange={(e)=>setForm({...form, date:e.target.value})}/>
            </div>

            <div className="col-md-4">
              <select className="form-select"
                onChange={(e)=>setForm({...form, status:e.target.value})}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Attendance;