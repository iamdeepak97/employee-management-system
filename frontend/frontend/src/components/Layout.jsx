import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container">
        {/* Brand with a more professional icon-like feel */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-2 px-2 py-1 me-2" style={{ fontSize: '0.8rem' }}>HRMS</div>
          <span className="fw-bold tracking-tight text-dark">Lite</span>
        </Link>

        {/* Navigation Links */}
        <div className="ms-auto">
          <ul className="navbar-nav d-flex flex-row align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link px-3 fw-medium text-secondary" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 fw-medium text-secondary" to="/employees">Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 fw-medium text-secondary" to="/attendance">Feed Attendance</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary btn-sm px-3 ms-2" to="/attendancelist">
                Attendance List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Main Content Area with a subtle background contrast */}
    <main className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {children}
          </div>
        </div>
      </div>
    </main>
  </>
);
}

export default Layout;