import { NavLink, Outlet } from "react-router-dom";

function ServiceLayout() {
  const linkClass = ({ isActive }) =>
    `btn text-start ${isActive ? "btn-primary" : "btn-outline-primary"}`;

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <aside className="col-md-3 col-lg-2">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Servis Paneli</h5>

              <nav className="d-grid gap-2">
                <NavLink to="/service/dashboard" className={linkClass}>
                  📊 Dashboard
                </NavLink>

                <NavLink to="/service/customers" className={linkClass}>
                  👥 Müşteriler
                </NavLink>

                <NavLink to="/service/vehicles" className={linkClass}>
                  🚗 Araçlar
                </NavLink>

                <NavLink to="/service/work-orders" className={linkClass}>
                  🔧 İş Emirleri
                </NavLink>

                <NavLink to="/service/parts" className={linkClass}>
                  📦 Stoklar
                </NavLink>
              </nav>
            </div>
          </div>
        </aside>

        <section className="col-md-9 col-lg-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default ServiceLayout;