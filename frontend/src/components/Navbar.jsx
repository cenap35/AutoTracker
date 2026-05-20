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
    <nav
      className="navbar navbar-expand-lg shadow-sm "
      style={{
        background: "linear-gradient(90deg, #3b60c5 55%, #314286 100%)",
        borderBottom: "3px solid #f7d358",
        boxShadow: "0 5px 36px -16px #3b60c588",
        minHeight: 72,
      }}
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" style={{ fontSize: 25 }}>
          <Logo />
          <span className="ms-1 d-none d-md-inline" style={{ letterSpacing: "1px", color: "#ffe082" }}>
            CarCare | Araç Takip
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavModern"
          aria-controls="navbarNavModern"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div 
          className="collapse navbar-collapse"
          id="navbarNavModern"
        >
          <div className="navbar-nav me-auto gap-1">
            <Link
              className="nav-link px-3 fw-semibold rounded-pill"
              to="/"
              style={{ color: "#fff", transition: "all 0.2s", marginLeft: 5 }}
            >
              <i className="bi bi-house-door-fill me-1"></i>
              Anasayfa
            </Link>
            {token && (
              <Link
                className="nav-link px-3 fw-semibold rounded-pill"
                to="/vehicles"
                style={{ color: "#fff", transition: "all 0.2s" }}
              >
                <i className="bi bi-car-front me-1"></i>
                Araçlarım
              </Link>
            )}
            {token && (
              <Link
                className="nav-link px-3 fw-semibold rounded-pill"
                to="/dashboard"
                style={{ color: "#fff", transition: "all 0.2s" }}
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Kontrol Paneli
              </Link>
            )}
          </div>
          <div className="navbar-nav ms-auto align-items-center gap-2">
            {!token ? (
              <>
                <Link
                  className="btn btn-outline-light fw-bold border-0 px-4 py-1 me-2"
                  style={{
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.08)",
                    color: "#ffe082",
                  }}
                  to="/login"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link
                  className="btn btn-warning fw-bold px-4 py-1"
                  style={{ borderRadius: 18 }}
                  to="/register"
                >
                  <i className="bi bi-person-plus-fill me-1"></i> Register
                </Link>
              </>
            ) : (
              <>
                <span
                  className="navbar-text fw-semibold me-2 text-white d-none d-lg-inline"
                  style={{ letterSpacing: ".5px", background: "rgba(255,255,255,0.08)", padding: "6px 18px", borderRadius: 18 }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {fullName}
                </span>
                <button
                  className="btn btn-outline-light btn-sm ms-lg-2 px-4 py-1"
                  onClick={handleLogout}
                  style={{
                    borderRadius: 18,
                    color: "#ffe082",
                    border: "2px solid #ffe082",
                    fontWeight: 700,
                    letterSpacing: ".5px",
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Çıkış
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
