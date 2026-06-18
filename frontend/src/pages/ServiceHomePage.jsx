import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceHomePage() {
  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="🏠"
          title="AutoTracker Service"
          subtitle="Servis yönetim paneline hoş geldiniz."
        />

        <div className="row g-3">
          <HomeCard
            icon="📊"
            title="Dashboard"
            text="Servis performansını, gelirleri ve son iş emirlerini görüntüleyin."
            to="/service/dashboard"
          />

          <HomeCard
            icon="👥"
            title="Müşteriler"
            text="Müşteri kayıtlarını yönetin."
            to="/service/customers"
          />

          <HomeCard
            icon="🚗"
            title="Araçlar"
            text="Müşterilere ait araç kayıtlarını takip edin."
            to="/service/vehicles"
          />

          <HomeCard
            icon="🔧"
            title="İş Emirleri"
            text="Bakım ve onarım süreçlerini yönetin."
            to="/service/work-orders"
          />

          <HomeCard
            icon="📦"
            title="Stoklar"
            text="Yedek parça ve stok durumunu takip edin."
            to="/service/parts"
          />

          <HomeCard
            icon="📝"
            title="Notlar"
            text="Servis içi hızlı notlar ve hatırlatmaları yönetin."
            to="/service/notes"
          />
        </div>
      </div>
    </PageWrapper>
  );
}

function HomeCard({ icon, title, text, to }) {
  return (
    <div className="col-md-6 col-xl-4">
      <Link to={to} className="text-decoration-none text-dark">
        <div className="service-home-card card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <div style={{ fontSize: 34 }}>{icon}</div>

            <h5 className="mt-3 mb-2" style={{ color: "#18265a", fontWeight: 800 }}>
              {title}
            </h5>

            <p className="text-muted mb-0">{text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ServiceHomePage;