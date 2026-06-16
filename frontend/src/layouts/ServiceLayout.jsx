import { NavLink, Outlet } from "react-router-dom";


function ServiceLayout() {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <aside className="col-md-3 col-lg-2">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Servis Paneli</h5>

              <nav className="d-grid gap-2">
                <NavLink
                  to="/service/dashboard"
                  className={({ isActive }) =>
                    `btn text-start ${
                      isActive ? "btn-primary" : "btn-outline-primary"
                    }`
                  }
                >
                  📊 Dashboard
                </NavLink>

                <NavLink
                  to="/service/customer"
                  className={({ isActive }) =>
                    `btn text-start ${
                      isActive ? "btn-primary" : "btn-outline-primary"
                    }`
                  }
                >
                  👥 Müşteriler
                </NavLink>

                <NavLink
                  to="/service/vehicles"
                  className={({ isActive }) =>
                    `btn text-start ${
                      isActive ? "btn-primary" : "btn-outline-primary"
                    }`
                  }
                >
                  🚗 Araçlar
                </NavLink>

                <NavLink
                  to="/service/work-orders"
                  className={({ isActive }) =>
                    `btn text-start ${
                      isActive ? "btn-primary" : "btn-outline-primary"
                    }`
                  }
                >
                  🔧 İş Emirleri
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