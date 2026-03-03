import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Dashboard() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("employees/")
      .then(res => {
        setCount(res.data.length);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    
  <div className="row g-4">
  {/* --- 1. STATS SECTION --- */}
  <h1 className="justify-content-between">Dummy content for Dashboard looks</h1>
  <div className="col-md-4">
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body d-flex align-items-center justify-content-between p-4">
        <div>
          <h6 className="text-muted mb-1 fw-semibold text-uppercase small">Total Employees</h6>
          <h2 className="fw-bold text-dark mb-0">{count}</h2>
          <span className="text-success small fw-medium">↑ 12% from last month</span>
        </div>
        <div className="bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-people-fill fs-3"></i>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body d-flex align-items-center justify-content-between p-4">
        <div>
          <h6 className="text-muted mb-1 fw-semibold text-uppercase small">On Leave Today</h6>
          <h2 className="fw-bold text-dark mb-0">8</h2>
          <span className="text-muted small fw-medium">4 Pending approval</span>
        </div>
        <div className="bg-warning bg-opacity-10 text-warning rounded-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-calendar-event-fill fs-3"></i>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body d-flex align-items-center justify-content-between p-4">
        <div>
          <h6 className="text-muted mb-1 fw-semibold text-uppercase small">New Hire Requests</h6>
          <h2 className="fw-bold text-dark mb-0">12</h2>
          <span className="text-info small fw-medium">Open positions: 5</span>
        </div>
        <div className="bg-info bg-opacity-10 text-info rounded-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-person-plus-fill fs-3"></i>
        </div>
      </div>
    </div>
  </div>

  {/* --- 2. MAIN CONTENT SECTION --- */}
  <div className="col-lg-8">
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-header bg-white border-0 p-4 pb-0">
        <h5 className="fw-bold mb-0">Recent Attendance Log</h5>
      </div>
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-muted text-uppercase">
                <th>Employee</th>
                <th>Check In</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary rounded-circle me-2" style={{width: '32px', height: '32px'}}></div>
                    <div>
                      <div className="fw-bold small">Arjun Sharma</div>
                      <div className="text-muted extra-small">UI Designer</div>
                    </div>
                  </div>
                </td>
                <td className="small">09:15 AM</td>
                <td><span className="badge bg-success-subtle text-success border border-success-subtle px-2">On Time</span></td>
                <td><button className="btn btn-sm btn-light">View</button></td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary rounded-circle me-2" style={{width: '32px', height: '32px'}}></div>
                    <div>
                      <div className="fw-bold small">Priya Patel</div>
                      <div className="text-muted extra-small">DevOps</div>
                    </div>
                  </div>
                </td>
                <td className="small">10:45 AM</td>
                <td><span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2">Late</span></td>
                <td><button className="btn btn-sm btn-light">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  {/* --- 3. SIDEBAR QUICK ACTIONS --- */}
  <div className="col-lg-4">
    <div className="card border-0 shadow-sm rounded-4 bg-dark text-white mb-4">
      <div className="card-body p-4 text-center">
        <h6 className="fw-light mb-3">Quick Actions</h6>
        <div className="d-grid gap-2">
          
          <button className="btn btn-outline-light py-2">Generate Payroll</button>
        </div>
      </div>
    </div>
    
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3">Upcoming Holidays</h6>
        <div className="d-flex align-items-center mb-3">
          <div className="bg-light p-2 rounded text-center me-3" style={{minWidth: '50px'}}>
            <div className="small fw-bold">Mar</div>
            <div className="h5 mb-0">25</div>
          </div>
          <div>
            <div className="fw-bold small">Holi Festival</div>
            <div className="text-muted small">National Holiday</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
    
}

export default Dashboard;