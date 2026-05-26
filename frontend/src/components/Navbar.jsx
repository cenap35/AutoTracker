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
          <div className="navbar-nav me-auto gap-1 flex-wrap align-items-center">
            <Link
              className="nav-link px-2 fw-semibold rounded-pill d-flex align-items-center gap-2"
              to="/"
              style={{ color: "#ffe082", fontSize: 15, minWidth: 40 }}
            >
              <i className="bi bi-house-door-fill"></i>
              <span className="d-none d-sm-inline">Anasayfa</span>
            </Link>
            {token && (
              <Link
                className="nav-link px-2 fw-semibold rounded-pill d-flex align-items-center gap-2"
                to="/vehicles"
                style={{ color: "#fff", fontSize: 15, minWidth: 40 }}
              >
                <i className="bi bi-car-front"></i>
                <span className="d-none d-sm-inline">Araçlarım</span>
              </Link>
            )}
            {token && (
              <Link
                className="nav-link px-2 fw-semibold rounded-pill d-flex align-items-center gap-2"
                to="/dashboard"
                style={{ color: "#fff", fontSize: 15, minWidth: 40 }}
              >
                <i className="bi bi-speedometer2"></i>
                <span className="d-none d-sm-inline">Panel</span>
              </Link>
            )}
            {token && (
              <Link
                className="nav-link px-2 fw-semibold rounded-pill d-flex align-items-center gap-2"
                to="/maintenance"
                style={{ color: "#fff", fontSize: 15, minWidth: 40 }}
              >
                <i className="bi bi-tools"></i>
                <span className="d-none d-sm-inline">Bakım</span>
              </Link>
            )}
            {token && (
              <Link
                className="nav-link px-2 fw-semibold rounded-pill d-flex align-items-center gap-2"
                to="/reports"
                style={{ color: "#fff", fontSize: 15, minWidth: 40 }}
              >
                <i className="bi bi-bar-chart-line"></i>
                <span className="d-none d-sm-inline">Raporlar</span>
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
                  <i className="bi bi-box-arrow-in-right me-1"></i> Giriş Yap
                </Link>
                <Link
                  className="btn btn-warning fw-bold px-4 py-1"
                  style={{ borderRadius: 18 }}
                  to="/register"
                >
                  <i className="bi bi-person-plus-fill me-1"></i> Kayıt Ol
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
