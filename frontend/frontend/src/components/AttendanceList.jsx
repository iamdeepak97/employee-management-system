import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const BASE_URL = "http://127.0.0.1:8000/api";

  // Fetch Employees
  useEffect(() => {
    axios.get(`${BASE_URL}/employees/`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Attendance
  useEffect(() => {
    let url = `${BASE_URL}/attendance/`;
    if (selectedEmployee) {
      url += `?employee=${selectedEmployee}`;
    }

    axios.get(url)
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));
  }, [selectedEmployee]);

  // 🔹 Counters
  const totalRecords = attendance.length;
  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Attendance Records</h2>

      {/* Employee Filter */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔥 COUNTER CARDS */}
      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total Records</h5>
              <h3>{totalRecords}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-success">
              <h5>Present</h5>
              <h3>{presentCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-danger">
              <h5>Absent</h5>
              <h3>{absentCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map(record => (
                  <tr key={record.id}>
                    <td>{record.employee_name}</td>
                    <td>{record.date}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === "Present"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;