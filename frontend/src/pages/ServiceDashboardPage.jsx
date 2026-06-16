import { useEffect, useState } from "react";
import { getServiceDashboard } from "../services/serviceDashboardService";

function ServiceDashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getServiceDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return <div className="container mt-4">Yükleniyor...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Servis Paneli</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Müşteri</h5>
              <h3>{dashboard.totalCustomers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Araç</h5>
              <h3>{dashboard.totalVehicles}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>İş Emri</h5>
              <h3>{dashboard.totalWorkOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Gelir</h5>
              <h3>{dashboard.totalRevenue} ₺</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDashboardPage;