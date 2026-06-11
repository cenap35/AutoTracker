import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import React from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    collapseNavbar();
    navigate("/login");
  };

  // Aktif linklerin stilini daha yumuşak ve modern bir cam efektiyle güncelledim
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#FFFFFF" : "#A5B4FC",
    background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
    border: isActive ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid transparent",
    boxShadow: isActive ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
    transition: "all 0.2s ease",
  });

  // Bootstrap collapse'ı kapatmak için fonksiyon
  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById("navbarNavModern");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      // Bootstrap 5 collapse trigger
      // eslint-disable-next-line no-undef
      window.bootstrap &&
        window.bootstrap.Collapse &&
        new window.bootstrap.Collapse(navbarCollapse, { toggle: true });
      // Fallback for basic class toggle (if Bootstrap 5 not on window)
      if (navbarCollapse.classList.contains("show"))
        navbarCollapse.classList.remove("show");
    }
  };

  // Linklere tıklandığında mobile görünümde menüyü kapat
  // Tıklanan elementin link olmasına (ve collapse açık olmasına) dikkat et
  const handleNavLinkClick = () => {
    // Sadece mobilde collapse'ı kapat
    if (window.innerWidth < 992) {
      collapseNavbar();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top custom-premium-navbar">
        <div className="container-fluid px-4">
          <Link
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            to="/"
            onClick={handleNavLinkClick}
          >
            <Logo />
            <span className="brand-title ms-1 d-none d-md-inline">
              CarCare <span className="brand-subtitle">| Araç Takip</span>
            </span>
          </Link>

          <button
            className="navbar-toggler custom-toggler-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavModern"
            aria-controls="navbarNavModern"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavModern">
            {/* Ortadaki Sayfa Linkleri */}
            <div className="navbar-nav me-auto gap-2 flex-wrap align-items-center mt-3 mt-lg-0">
              <NavLink
                className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                to="/"
                end
                style={navLinkStyle}
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-house-door-fill"></i>
                <span className="d-none d-sm-inline">Anasayfa</span>
              </NavLink>

              {token && (
                <NavLink
                  className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                  to="/vehicles"
                  style={navLinkStyle}
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-car-front-fill"></i>
                  <span className="d-none d-sm-inline">Araçlarım</span>
                </NavLink>
              )}

              {token && (
                <NavLink
                  className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                  to="/dashboard"
                  style={navLinkStyle}
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="d-none d-sm-inline">Panel</span>
                </NavLink>
              )}

              {token && (
                <NavLink
                  className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                  to="/maintenance"
                  style={navLinkStyle}
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-tools"></i>
                  <span className="d-none d-sm-inline">Bakım</span>
                </NavLink>
              )}

              {token && (
                <NavLink
                  className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                  to="/reminders"
                  style={navLinkStyle}
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-calendar-check-fill"></i>
                  <span className="d-none d-sm-inline">Takipler</span>
                </NavLink>
              )}

              {token && (
                <NavLink
                  className="nav-link nav-hover px-3 py-2 fw-medium rounded-3 d-flex align-items-center gap-2"
                  to="/reports"
                  style={navLinkStyle}
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-bar-chart-line-fill"></i>
                  <span className="d-none d-sm-inline">Raporlar</span>
                </NavLink>
              )}
            </div>

            {/* Sağ Taraf - Giriş/Kayıt veya Kullanıcı Paneli */}
            <div className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
              {!token ? (
                <>
                  <NavLink
                    className="btn btn-premium-login px-4 py-2"
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Giriş Yap
                  </NavLink>

                  <NavLink
                    className="btn btn-premium-register px-4 py-2"
                    to="/register"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-person-plus-fill me-1"></i> Kayıt Ol
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/account"
                    className="user-profile-badge text-decoration-none"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>{fullName}</span>
                  </NavLink>

                  <button
                    className="btn btn-premium-logout px-4 py-2 ms-lg-2"
                    onClick={handleLogout}
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

      {/* Tasarımı Şahlandıran Ama Yapıyı Şişirmeyen Temiz CSS */}
      <style>{`
        /* Ana Navbar - Modern Koyu Gece Mavisi ve İnce Çizgi */
        .custom-premium-navbar {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          min-height: 70px;
        }

        /* Logo ve Başlık Stilleri */
        .brand-title {
          font-size: 20px;
          letter-spacing: 0.5px;
          color: #ffffff;
        }
        .brand-subtitle {
          color: #a5b4fc;
          font-weight: 300;
          font-size: 15px;
        }

        /* Link Hover Efektleri */
        .nav-hover {
          font-size: 14.5px;
          transition: all 0.2s ease;
        }
        .nav-hover:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          color: #ffffff !important;
        }

        /* Yeni Giriş Yap Butonu */
        .btn-premium-login {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-weight: 600;
          font-size: 14px;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .btn-premium-login:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Yeni Kayıt Ol Butonu (Göz Alıcı İndigo Gradyan) */
        .btn-premium-register {
          background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
          transition: all 0.2s ease;
        }
        .btn-premium-register:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.45);
          color: #ffffff;
        }

        /* Kullanıcı Bilgi Kapsülü */
        .user-profile-badge {
          display: inline-flex;
          align-items: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }
        .user-profile-badge:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Yeni Çıkış Butonu */
        .btn-premium-logout {
          background: transparent;
          color: #f87171; /* Modern soft kırmızı */
          border: 1px solid rgba(248, 113, 113, 0.3);
          font-weight: 600;
          font-size: 14px;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .btn-premium-logout:hover {
          background: rgba(248, 113, 113, 0.1);
          border-color: #f87171;
          color: #f87171;
        }

        /* Mobil Menü Butonu Temizliği */
        .custom-toggler-btn {
          border: none !important;
          padding: 6px !important;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }
        .custom-toggler-btn:focus {
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}

export default Navbar;