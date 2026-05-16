import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              Anasayfa
            </Link>
            {token && (
              <Link className="nav-link" to="/vehicles">
                Araçlarım
              </Link>
            )}
            {token && (
              <Link className="nav-link" to="/dashboard">
                Kontrol Paneli
              </Link>
            )}
          </div>
          <div className="navbar-nav ms-auto align-items-center">
            {!token ? (
              <>
                <Link className="nav-link" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link className="nav-link" to="/register">
                  <i className="bi bi-person-plus-fill me-1"></i> Register
                </Link>
              </>
            ) : (
              <>
                <span className="navbar-text me-2 text-white d-none d-lg-inline">
                  <i className="bi bi-person-circle me-1"></i>
                  {fullName}
                </span>
                <button
                  className="btn btn-light btn-sm ms-lg-2"
                  onClick={handleLogout}
                  style={{ minWidth: "90px" }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
