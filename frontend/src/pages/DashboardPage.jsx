import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { getVehicles } from "../services/vehicleService";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper>
    <div className="container py-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-primary mb-2" style={{letterSpacing: "1px"}}>Kontrol Paneli</h1>
          <p className="lead" style={{color:"#456", maxWidth: 600}}>Hoş geldiniz! Araçlarınızın özet bilgilerinin yanı sıra bakım masraflarınızı takip edebilir ve detaylarını görüntüleyebilirsiniz.</p>
        </div>
        <div className="col-md-4">
          <img
            src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80"
            alt="Dashboard illustration"
            className="img-fluid rounded shadow-sm d-none d-md-block"
            style={{maxHeight:140, objectFit:"cover", float:"right"}}
          />
        </div>
      </div>
      <div className="row mb-5 g-4">
        <div className="col-sm-4">
          <div className="card shadow-sm border-0 h-100 dashboard-stat">
            <div className="card-body text-center py-4">
              <div className="mb-2" style={{fontSize:36, color:"#2557c0"}}>
                <i className="bi bi-truck-front-fill"></i>
              </div>
              <h6 className="card-title text-secondary mb-1">Toplam Araç</h6>
              <div className="h4 fw-bold text-dark">{summary.totalVehicles || 0}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card shadow-sm border-0 h-100 dashboard-stat">
            <div className="card-body text-center py-4">
              <div className="mb-2" style={{fontSize:36, color:"#17833c"}}>
                <i className="bi bi-wrench-adjustable"></i>
              </div>
              <h6 className="card-title text-secondary mb-1">Bakım Kaydı</h6>
              <div className="h4 fw-bold text-dark">{summary.totalMaintenanceRecords || 0}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card shadow-sm border-0 h-100 dashboard-stat">
            <div className="card-body text-center py-4">
              <div className="mb-2" style={{fontSize:36, color:"#d49f1b"}}>
                <i className="bi bi-currency-exchange"></i>
              </div>
              <h6 className="card-title text-secondary mb-1">Toplam Bakım Masrafı</h6>
              <div className="h4 fw-bold text-dark">
                ₺{summary.totalMaintenanceCost ? summary.totalMaintenanceCost.toLocaleString("tr-TR") : "0"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="h4 fw-bold text-primary m-0">
          <i className="bi bi-car-front-fill me-2"></i> Araçlarım
        </h2>
        <Link to="/vehicles" className="btn btn-outline-primary btn-sm">
          Tümünü Gör <i className="bi bi-arrow-right-short"></i>
        </Link>
      </div>
      {vehicles.length === 0 && (
        <div className="alert alert-info shadow-sm">Henüz hiç aracınız yok. Şimdi bir araç ekleyin!</div>
      )}
      <div className="row g-4">
        {vehicles.map((vehicle) => (
          <div className="col-md-6 col-lg-4" key={vehicle.id}>
            <div className="card h-100 shadow-sm border-0 vehicle-card position-relative">
              <div className="card-body pb-3">
                <div className="mb-2">
                  <span className="badge bg-primary me-2" style={{fontSize:14}}>{vehicle.plateNumber}</span>
                  <span className="badge bg-light text-dark border ms-1" style={{fontSize:13}}>
                    {vehicle.year}
                  </span>
                </div>
                <h5 className="card-title fw-bold mb-1" style={{color: "#345"}}>{vehicle.brand} {vehicle.model}</h5>
                <div className="mb-2 small text-muted">
                  <i className="bi bi-speedometer2 me-1"></i>
                  {vehicle.currentMileage?.toLocaleString("tr-TR") || 0} km
                </div>
                <Link
                  to={`/vehicles/${vehicle.id}`}
                  className="stretched-link fw-bold text-decoration-none"
                  style={{color: "#3b60c5"}}
                >
                  Detaylar <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
}

export default DashboardPage;
