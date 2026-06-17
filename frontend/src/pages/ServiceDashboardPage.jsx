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
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Tamamlanan</h6>
            <h3>{dashboard.completedWorkOrders}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Bekleyen</h6>
            <h3>{dashboard.pendingWorkOrders}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>İşlemde</h6>
            <h3>{dashboard.inProgressWorkOrders}</h3>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h5>Son İş Emirleri</h5>

          {dashboard.recentWorkOrders.length === 0 && (
            <p className="text-muted">Henüz iş emri yok.</p>
          )}

          {dashboard.recentWorkOrders.map((order) => (
            <div key={order.id} className="border-bottom py-2">
              <strong>{order.title}</strong>

              <div className="text-muted small">
                {order.customerName} - {order.vehicleName} - {order.plate}
              </div>

              <div>
                {order.totalCost} ₺ / {order.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDashboardPage;
