import { useEffect, useState } from "react";
import { getServiceDashboard } from "../services/serviceDashboardService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

  const chartData =
    dashboard?.monthlyRevenueStats?.map((item) => ({
      month: `${item.month}/${item.year}`,
      revenue: item.revenue,
    })) || [];

  if (!dashboard) {
    return <div className="container mt-4">Yükleniyor...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{dashboard.serviceBusiness.name} Paneli</h2>
      <p className="text-muted">{dashboard.serviceBusiness.city}</p>

      <div className="row g-3 mt-3">
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Müşteri</h6>
            <h3>{dashboard.totalCustomers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Araç</h6>
            <h3>{dashboard.totalVehicles}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>İş Emri</h6>
            <h3>{dashboard.totalWorkOrders}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Toplam Gelir</h6>
            <h3>{dashboard.totalRevenue} ₺</h3>
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

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Bu Ay Gelir</h6>
            <h3>{dashboard.monthlyRevenue} ₺</h3>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5>Aylık Gelir Grafiği</h5>

          {chartData.length === 0 ? (
            <p className="text-muted">Henüz gelir verisi yok.</p>
          ) : (
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0d6efd"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
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