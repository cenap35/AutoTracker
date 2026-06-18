import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";
import { getServiceDashboard } from "../services/serviceDashboardService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function ServiceDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await getServiceDashboard();
      setDashboard(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Dashboard verileri yüklenemedi.");
      toast.error("Dashboard verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const chartData =
    dashboard?.monthlyRevenueStats?.map((item) => ({
      month: `${item.month}/${item.year}`,
      revenue: item.revenue,
    })) || [];

  const statusChartData = useMemo(() => {
    if (!dashboard) return [];

    return [
      { name: "Bekleyen", value: dashboard.pendingWorkOrders },
      { name: "İşlemde", value: dashboard.inProgressWorkOrders },
      { name: "Tamamlanan", value: dashboard.completedWorkOrders },
    ];
  }, [dashboard]);

  const completionRate =
    dashboard?.totalWorkOrders > 0
      ? Math.round(
          (dashboard.completedWorkOrders / dashboard.totalWorkOrders) * 100
        )
      : 0;

  const activeWorkOrders =
    (dashboard?.pendingWorkOrders || 0) +
    (dashboard?.inProgressWorkOrders || 0);

  const activeRate =
    dashboard?.totalWorkOrders > 0
      ? Math.round((activeWorkOrders / dashboard.totalWorkOrders) * 100)
      : 0;

  const averageRevenue =
    dashboard?.completedWorkOrders > 0
      ? dashboard.totalRevenue / dashboard.completedWorkOrders
      : 0;

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("tr-TR", {
      maximumFractionDigits: 0,
    });

  const getStatusText = (status) => {
    if (status === "Pending") return "Bekliyor";
    if (status === "InProgress") return "İşlemde";
    if (status === "Completed") return "Tamamlandı";
    return status;
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-warning text-dark fw-semibold";
    if (status === "InProgress") return "bg-primary text-white fw-semibold";
    if (status === "Completed") return "bg-success text-white fw-semibold";
    return "bg-secondary text-white fw-semibold";
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Servis paneli yükleniyor..." />
      </PageWrapper>
    );
  }

  if (!dashboard) {
    return (
      <PageWrapper>
        <div
          className="card border-0 shadow-sm p-5 text-center"
          style={{ borderRadius: 16 }}
        >
          <div style={{ fontSize: 48 }}>📊</div>

          <h5 className="mt-3 mb-2" style={{ color: "#18265a", fontWeight: 800 }}>
            Dashboard verisi bulunamadı
          </h5>

          <p className="text-muted mb-0">
            Servis hesabı veya panel verisi alınamadı.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container-fluid px-0">
        <ServicePageHeader
          icon="📊"
          title={`${dashboard.serviceBusiness.name} Paneli`}
          subtitle={`${
            dashboard.serviceBusiness.city || "Şehir bilgisi yok"
          } servis yönetim özeti`}
        />

        {error && (
          <div
            className="alert alert-danger shadow-sm rounded-3 d-flex align-items-center"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill me-2 fs-5" />
            <div>{error}</div>
          </div>
        )}

        <div className="row g-3 mb-4">
          <StatCard
            icon="👥"
            title="Müşteri"
            value={dashboard.totalCustomers}
            tone="#3b60c5"
          />

          <StatCard
            icon="🚗"
            title="Araç"
            value={dashboard.totalVehicles}
            tone="#1a906c"
          />

          <StatCard
            icon="🔧"
            title="İş Emri"
            value={dashboard.totalWorkOrders}
            tone="#b78b16"
          />

          <StatCard
            icon="💰"
            title="Toplam Gelir"
            value={`₺${formatCurrency(dashboard.totalRevenue)}`}
            tone="#2ecc71"
          />

          <StatCard
            icon="🟢"
            title="Tamamlanan"
            value={dashboard.completedWorkOrders}
            tone="#2ecc71"
          />

          <StatCard
            icon="🟡"
            title="Bekleyen"
            value={dashboard.pendingWorkOrders}
            tone="#f1c40f"
          />

          <StatCard
            icon="🔵"
            title="İşlemde"
            value={dashboard.inProgressWorkOrders}
            tone="#3498db"
          />

          <StatCard
            icon="📅"
            title="Bu Ay Gelir"
            value={`₺${formatCurrency(dashboard.monthlyRevenue)}`}
            tone="#9b59b6"
          />
        </div>

        <div className="row g-3 mb-4">
          <MiniInsight
            title="Tamamlanma Oranı"
            value={`%${completionRate}`}
            text="Tamamlanan iş emri oranı"
            progress={completionRate}
          />

          <MiniInsight
            title="Aktif İşler"
            value={activeWorkOrders}
            text="Bekleyen + işlemde işler"
            progress={activeRate}
          />

          <MiniInsight
            title="Ortalama İş Emri"
            value={`₺${formatCurrency(averageRevenue)}`}
            text="Tamamlanan işler üzerinden"
            isCurrency
          />
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div
              className="dashboard-card-hover card border-0 shadow-sm h-100"
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="mb-4 d-flex align-items-center"
                  style={{ color: "#18265a", fontWeight: 800 }}
                >
                  <span className="me-2">📈</span>
                  Aylık Gelir Grafiği
                </h5>

                {chartData.length === 0 ? (
                  <p className="text-muted py-5 text-center">
                    Henüz gelir verisi yok.
                  </p>
                ) : (
                  <div style={{ height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="month"
                          stroke="#a0aec0"
                          style={{ fontSize: 12 }}
                        />
                        <YAxis stroke="#a0aec0" style={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18265a",
                            borderRadius: 8,
                            color: "#fff",
                            border: "0",
                          }}
                          labelStyle={{ color: "#fff" }}
                          formatter={(value) => [
                            `${formatCurrency(value)} ₺`,
                            "Gelir",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b60c5"
                          strokeWidth={4}
                          dot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="dashboard-card-hover card border-0 shadow-sm h-100"
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="mb-4 d-flex align-items-center"
                  style={{ color: "#18265a", fontWeight: 800 }}
                >
                  <span className="me-2">📊</span>
                  İş Durumu Dağılımı
                </h5>

                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statusChartData}
                      margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#a0aec0"
                        style={{ fontSize: 12 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        stroke="#a0aec0"
                        style={{ fontSize: 12 }}
                      />
                      <Tooltip contentStyle={{ borderRadius: 8 }} />
                      <Bar
                        dataKey="value"
                        fill="#3b60c5"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="dashboard-card-hover card border-0 shadow-sm mt-4"
          style={{
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5
                className="mb-0 d-flex align-items-center"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                <span className="me-2">📋</span>
                Son İş Emirleri
              </h5>

              <Link
                to="/service/work-orders"
                className="btn btn-sm px-3 rounded-pill btn-outline-primary fw-semibold"
              >
                Tümünü Gör
              </Link>
            </div>

            {dashboard.recentWorkOrders.length === 0 ? (
              <div className="text-center p-5 bg-light rounded-3">
                <div style={{ fontSize: 40 }}>🔧</div>
                <h6 className="mt-3 fw-bold">Henüz iş emri yok</h6>
                <p className="text-muted mb-0">
                  Yeni iş emri oluşturduğunuzda burada listelenecektir.
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {dashboard.recentWorkOrders.map((order) => (
                  <div
                    key={order.id}
                    className="dashboard-row-hover d-flex justify-content-between align-items-center gap-3 flex-wrap p-3 rounded-3"
                    style={{
                      backgroundColor: "#fdfdfd",
                      border: "1px solid #f1f3f9",
                    }}
                  >
                    <div>
                      <h6
                        className="mb-1"
                        style={{ color: "#18265a", fontWeight: 700 }}
                      >
                        {order.title}
                      </h6>

                      <div className="text-muted small d-flex align-items-center gap-2 flex-wrap">
                        <span>
                          <i className="bi bi-person me-1" />
                          {order.customerName}
                        </span>

                        <span className="text-secondary">•</span>

                        <span>
                          <i className="bi bi-car-front me-1" />
                          {order.vehicleName}
                        </span>

                        <span className="text-secondary">•</span>

                        <span className="badge bg-light text-secondary border px-2 py-1">
                          {order.plate}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 flex-wrap ms-auto">
                      <span
                        className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>

                      <span
                        className="fw-bold px-3 py-1 bg-light rounded text-dark"
                        style={{ color: "#18265a" }}
                      >
                        ₺{formatCurrency(order.totalCost)}
                      </span>

                      <Link
                        to={`/service/work-orders/${order.id}`}
                        className="btn btn-sm btn-light border text-primary fw-semibold px-3"
                      >
                        Detay
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            .dashboard-card-hover {
              transition:
                box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
                transform 0.22s cubic-bezier(.17,.67,.59,1.17),
                background 0.18s cubic-bezier(.17,.67,.59,1.17);
            }

            .dashboard-card-hover:hover {
              box-shadow:
                0 14px 34px rgba(44, 62, 100, 0.18),
                0 2px 6px rgba(180, 206, 237, 0.16) !important;
              transform: translateY(-2px) scale(1.017);
            }

            .dashboard-row-hover {
              transition:
                box-shadow 0.2s ease,
                transform 0.2s ease,
                background 0.18s ease;
            }

            .dashboard-row-hover:hover {
              background: #f5f9ff !important;
              box-shadow: 0 8px 22px rgba(44, 62, 100, 0.1);
              transform: translateX(4px);
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

function StatCard({ icon, title, value, tone }) {
  const rgbaBg = tone.startsWith("#")
    ? `rgba(${parseInt(tone.slice(1, 3), 16)}, ${parseInt(
        tone.slice(3, 5),
        16
      )}, ${parseInt(tone.slice(5, 7), 16)}, 0.12)`
    : "rgba(59, 96, 197, 0.12)";

  return (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div
        className="dashboard-card-hover card border-0 shadow-sm h-100"
        style={{ borderRadius: 16 }}
      >
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: rgbaBg,
                fontSize: 22,
              }}
            >
              {icon}
            </div>

            <div className="overflow-hidden">
              <div className="text-muted small fw-medium text-truncate">
                {title}
              </div>

              <div
                className="h4 fw-bold mb-0 mt-1 text-truncate"
                style={{ color: "#18265a", letterSpacing: -0.5 }}
              >
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniInsight({ title, value, text, progress, isCurrency }) {
  return (
    <div className="col-md-4">
      <div
        className="dashboard-card-hover card border-0 shadow-sm h-100 p-2"
        style={{
          borderRadius: 16,
          background: "linear-gradient(135deg, #fdfeff 0%, #f4f8ff 100%)",
          borderLeft: "4px solid #3b60c5",
        }}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="text-muted small fw-semibold text-uppercase mb-1">
              {title}
            </div>

            <div className="h3 fw-bold mb-2" style={{ color: "#18265a" }}>
              {value}
            </div>
          </div>

          <div>
            {progress !== undefined ? (
              <div
                className="progress mb-2"
                style={{ height: 6, borderRadius: 10 }}
              >
                <div
                  className="progress-bar bg-primary rounded-pill"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            ) : isCurrency ? (
              <div className="mb-2" style={{ height: 6 }} />
            ) : null}

            <p className="text-muted small mb-0 opacity-75">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDashboardPage;