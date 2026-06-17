import { NavLink, Outlet } from "react-router-dom";

function ServiceLayout() {
  const linkClass = ({ isActive }) =>
    `service-nav-link ${isActive ? "active" : ""}`;

  return (
    <div className="service-shell">
      <aside className="service-sidebar">
        <div className="service-brand">
          <div className="service-logo">🔧</div>
          <div>
            <h5>Servis Paneli</h5>
            <span>AutoTracker Service</span>
          </div>
        </div>

        <nav className="service-nav">
          <NavLink to="/service/dashboard" className={linkClass}>
            <span>📊</span> Dashboard
          </NavLink>

          <NavLink to="/service/customers" className={linkClass}>
            <span>👥</span> Müşteriler
          </NavLink>

          <NavLink to="/service/vehicles" className={linkClass}>
            <span>🚗</span> Araçlar
          </NavLink>

          <NavLink to="/service/work-orders" className={linkClass}>
            <span>🔧</span> İş Emirleri
          </NavLink>

          <NavLink to="/service/parts" className={linkClass}>
            <span>📦</span> Stoklar
          </NavLink>

          <NavLink to="/service/settings" className={linkClass}>
            <span>🏢</span> Servis Bilgileri
          </NavLink>
        </nav>
      </aside>

      <main className="service-main">
        <div className="service-topbar">
          <div>
            <h4>AutoTracker Service</h4>
            <p>Servis yönetim paneli</p>
          </div>

          <NavLink to="/" className="service-exit-btn">
            Ana uygulamaya dön
          </NavLink>
        </div>

        <div className="service-content">
          <Outlet />
        </div>
      </main>

      <style>{`
        .service-shell {
          min-height: 100vh;
          display: flex;
          background:
            radial-gradient(circle at top right, rgba(59,96,197,.14), transparent 32%),
            linear-gradient(135deg, #f4f7ff 0%, #eef3fb 45%, #fffaf1 100%);
        }

        .service-sidebar {
          width: 260px;
          min-height: 100vh;
          padding: 24px 18px;
          background: linear-gradient(180deg, #101936 0%, #18265a 100%);
          color: white;
          box-shadow: 12px 0 30px rgba(16, 25, 54, 0.18);
          position: sticky;
          top: 0;
        }

        .service-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 8px 24px;
          border-bottom: 1px solid rgba(255,255,255,.12);
          margin-bottom: 18px;
        }

        .service-logo {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(255,255,255,.13);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.16);
        }

        .service-brand h5 {
          margin: 0;
          font-weight: 800;
          letter-spacing: .2px;
        }

        .service-brand span {
          font-size: .82rem;
          color: rgba(255,255,255,.68);
        }

        .service-nav {
          display: grid;
          gap: 9px;
        }

        .service-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 14px;
          color: rgba(255,255,255,.78);
          text-decoration: none;
          font-weight: 650;
          transition: all .2s ease;
        }

        .service-nav-link:hover {
          color: white;
          background: rgba(255,255,255,.1);
          transform: translateX(3px);
        }

        .service-nav-link.active {
          color: #101936;
          background: linear-gradient(135deg, #ffffff 0%, #e9efff 100%);
          box-shadow: 0 10px 24px rgba(0,0,0,.16);
        }

        .service-main {
          flex: 1;
          min-width: 0;
        }

        .service-topbar {
          margin: 22px 24px 0;
          padding: 18px 22px;
          border-radius: 22px;
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.8);
          box-shadow: 0 12px 30px rgba(44, 62, 100, .08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .service-topbar h4 {
          margin: 0;
          color: #18265a;
          font-weight: 800;
        }

        .service-topbar p {
          margin: 3px 0 0;
          color: #6d7890;
          font-size: .92rem;
        }

        .service-exit-btn {
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 14px;
          background: #18265a;
          color: white;
          font-weight: 700;
          white-space: nowrap;
        }

        .service-exit-btn:hover {
          color: white;
          background: #0f183d;
        }

        .service-content {
          padding: 24px;
        }

        .service-content .card {
          border: 0;
          border-radius: 18px;
          box-shadow: 0 10px 28px rgba(44, 62, 100, .08);
        }

        .service-content .form-control,
        .service-content .form-select {
          border-radius: 12px;
          border-color: #dfe6f2;
          min-height: 42px;
        }

        .service-content .btn {
          border-radius: 12px;
          font-weight: 650;
        }

        @media (max-width: 768px) {
          .service-shell {
            flex-direction: column;
          }

          .service-sidebar {
            width: 100%;
            min-height: auto;
            position: static;
          }

          .service-nav {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .service-topbar {
            margin: 16px;
            flex-direction: column;
            align-items: flex-start;
          }

          .service-content {
            padding: 16px;
          }

          .service-page-header {
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(255,255,255,.85);
  box-shadow: 0 12px 30px rgba(44, 62, 100, .08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.service-page-header h2 {
  margin: 0;
  color: #18265a;
  font-weight: 850;
}

.service-page-header p {
  margin: 6px 0 0;
  color: #6d7890;
}
        }
      `}</style>
    </div>
  );
}

export default ServiceLayout;
