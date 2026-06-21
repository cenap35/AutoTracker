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
          <NavLink to="/service" end className={linkClass}>
            <span>🏠</span> <b>Ana Sayfa</b>
          </NavLink>
          <hr
            style={{ borderColor: "#fff", opacity: 0.15, margin: "10px 0" }}
          />
          <NavLink to="/service/dashboard" className={linkClass}>
            <span>📊</span> <b>Panel</b>
          </NavLink>

          <NavLink to="/service/customers" className={linkClass}>
            <span>👥</span> <b>Müşteriler</b>
          </NavLink>

          <NavLink to="/service/vehicles" className={linkClass}>
            <span>🚗</span> <b>Araçlar</b>
          </NavLink>

          <NavLink to="/service/work-orders" className={linkClass}>
            <span>🔧</span> <b>İş Emirleri</b>
          </NavLink>
          <NavLink to="/service/account-transactions" className={linkClass}>
            <span>💼</span> <b>Cari Takip</b>
          </NavLink>
          <hr
            style={{ borderColor: "#fff", opacity: 0.15, margin: "10px 0" }}
          />

          <NavLink to="/service/part-sales" className={linkClass}>
            <span>💸</span> <b>Stok Finans</b>
          </NavLink>
          <NavLink to="/service/parts" className={linkClass}>
            <span>📦</span> <b>Stoklar</b>
          </NavLink>

          <NavLink to="/service/notes" className={linkClass}>
            <span>📝</span> <b>Notlar</b>
          </NavLink>
          <hr
            style={{ borderColor: "#fff", opacity: 0.15, margin: "10px 0" }}
          />
          <NavLink to="/service/settings" className={linkClass}>
            <span>🏢</span> <b>Servis Bilgileri</b>
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
          height: 100vh;
          display: flex;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, rgba(59,96,197,.14), transparent 32%),
            linear-gradient(135deg, #f4f7ff 0%, #eef3fb 45%, #fffaf1 100%);
        }

        .service-sidebar {
          width: 270px;
          height: 100vh;
          flex-shrink: 0;
          padding: 24px 18px;
          background: linear-gradient(180deg, #101936 0%, #18265a 100%);
          color: white;
          box-shadow: 12px 0 30px rgba(16, 25, 54, 0.2);
          overflow-y: auto;
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
          width: 46px;
          height: 46px;
          border-radius: 16px;
          background: rgba(255,255,255,.14);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.16);
        }

        .service-brand h5 {
          margin: 0;
          font-weight: 850;
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
          padding: 12px 13px;
          border-radius: 15px;
          color: rgba(255,255,255,.78);
          text-decoration: none;
          transition: all .2s ease;
        }

        .service-nav-link span {
          width: 24px;
          text-align: center;
          font-size: 1.05rem;
        }

        .service-nav-link b {
          font-size: .95rem;
          font-weight: 750;
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
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .service-topbar {
          flex-shrink: 0;
          margin: 18px 24px 0;
          padding: 16px 22px;
          border-radius: 22px;
          background: rgba(255,255,255,.86);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.9);
          box-shadow: 0 12px 30px rgba(44, 62, 100, .09);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          z-index: 5;
        }

        .service-topbar h4 {
          margin: 0;
          color: #18265a;
          font-weight: 850;
        }

        .service-topbar p {
          margin: 3px 0 0;
          color: #6d7890;
          font-size: .92rem;
        }

        .service-exit-btn {
          text-decoration: none;
          padding: 10px 15px;
          border-radius: 14px;
          background: #18265a;
          color: white;
          font-weight: 750;
          white-space: nowrap;
          box-shadow: 0 10px 24px rgba(24, 38, 90, .18);
        }

        .service-exit-btn:hover {
          color: white;
          background: #0f183d;
          transform: translateY(-1px);
        }

        .service-content {
          flex: 1;
          overflow-y: auto;
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
          margin-bottom: 18px;
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

        @media (max-width: 768px) {
          .service-sidebar {
            width: 76px;
            padding: 16px 10px;
          }

          .service-brand {
            justify-content: center;
            padding: 6px 0 18px;
          }

          .service-brand div:last-child {
            display: none;
          }

          .service-logo {
            width: 44px;
            height: 44px;
          }

          .service-nav-link {
            justify-content: center;
            padding: 12px 8px;
          }

          .service-nav-link b {
            display: none;
          }

          .service-nav-link span {
            font-size: 1.25rem;
          }

          .service-topbar {
            margin: 12px 12px 0;
            padding: 14px;
            border-radius: 18px;
          }

          .service-topbar p {
            display: none;
          }

          .service-topbar h4 {
            font-size: 1rem;
          }

          .service-exit-btn {
            padding: 9px 11px;
            font-size: .82rem;
          }

          .service-content {
            padding: 14px 12px;
          }

          .service-page-header {
            padding: 16px;
            border-radius: 18px;
            align-items: flex-start;
          }

          .service-page-header h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ServiceLayout;
