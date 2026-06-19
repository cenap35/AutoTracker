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

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("tr-TR", {
      maximumFractionDigits: 0,
    });

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

  const activeWorkOrders =
    (dashboard?.pendingWorkOrders || 0) +
    (dashboard?.inProgressWorkOrders || 0);

  const completionRate =
    dashboard?.totalWorkOrders > 0
      ? Math.round(
          (dashboard.completedWorkOrders / dashboard.totalWorkOrders) * 100,
        )
      : 0;

  const averageRevenue =
    dashboard?.completedWorkOrders > 0
      ? dashboard.totalRevenue / dashboard.completedWorkOrders
      : 0;

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
        <div className="card border-0 shadow-sm p-5 text-center rounded-4">
          <div style={{ fontSize: 48 }}>📊</div>
          <h5 className="mt-3 mb-2 fw-bold" style={{ color: "#18265a" }}>
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
          <div className="alert alert-danger shadow-sm rounded-3 d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2 fs-5" />
            <div>{error}</div>
          </div>
        )}

        <div className="dashboard-hero card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3 align-items-center">
              <div className="col-lg-7">
                <div className="d-flex align-items-center gap-3">
                  <div className="dashboard-hero-icon">🛠️</div>
                  <div>
                    <h4 className="mb-1 fw-bold" style={{ color: "#18265a" }}>
                      Bugünkü servis durumu
                    </h4>
                    <p className="text-muted mb-0">
                      Açık işler, gelir özeti ve son iş emirlerini tek ekrandan takip et.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="row g-2">
                  <QuickMetric
                    title="Açık İş"
                    value={activeWorkOrders}
                    tone="#b78b16"
                  />
                  <QuickMetric
                    title="Bu Ay Gelir"
                    value={`₺${formatCurrency(dashboard.monthlyRevenue)}`}
                    tone="#1a906c"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionTitle
          icon="📌"
          title="Operasyon Özeti"
          text="Servisteki müşteri, araç ve iş emri durumunun genel görünümü."
        />

        <div className="row g-3 mb-4">
          <StatCard icon="👥" title="Müşteri" value={dashboard.totalCustomers} tone="#3b60c5" />
          <StatCard icon="🚗" title="Araç" value={dashboard.totalVehicles} tone="#1a906c" />
          <StatCard icon="🔧" title="Toplam İş Emri" value={dashboard.totalWorkOrders} tone="#b78b16" />
          <StatCard icon="📂" title="Açık İş" value={activeWorkOrders} tone="#ff7c3c" />
        </div>

        <SectionTitle
          icon="💰"
          title="Finans Özeti"
          text="İş emirleri üzerinden servis gelir durumu."
        />

        <div className="row g-3 mb-4">
          <StatCard
            icon="📅"
            title="Bu Ay Gelir"
            value={`₺${formatCurrency(dashboard.monthlyRevenue)}`}
            tone="#9b59b6"
          />
          <StatCard
            icon="💰"
            title="Toplam Gelir"
            value={`₺${formatCurrency(dashboard.totalRevenue)}`}
            tone="#2ecc71"
          />
          <StatCard
            icon="🧾"
            title="Ortalama İş Tutarı"
            value={`₺${formatCurrency(averageRevenue)}`}
            tone="#b78b16"
          />
        </div>

        <SectionTitle
          icon="⚙️"
          title="İş Durumu"
          text="Bekleyen, işlemde ve tamamlanan iş emirlerinin dağılımı."
        />

        <div className="row g-3 mb-4">
          <StatCard icon="🟡" title="Bekleyen" value={dashboard.pendingWorkOrders} tone="#f1c40f" />
          <StatCard icon="🔵" title="İşlemde" value={dashboard.inProgressWorkOrders} tone="#3498db" />
          <StatCard icon="🟢" title="Tamamlanan" value={dashboard.completedWorkOrders} tone="#2ecc71" />

          <InsightCard
            title="Tamamlanma Oranı"
            value={`%${completionRate}`}
            text="Tamamlanan iş emri oranı"
            progress={completionRate}
          />
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="dashboard-card-hover card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <CardHeader
                  icon="📈"
                  title="Aylık Gelir Grafiği"
                  text="İş emirlerinden gelen aylık gelir trendi."
                />

                {chartData.length === 0 ? (
                  <EmptyState icon="📈" text="Henüz gelir verisi yok." />
                ) : (
                  <div style={{ height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#edf2fb" />
                        <XAxis dataKey="month" stroke="#a0aec0" style={{ fontSize: 12 }} />
                        <YAxis stroke="#a0aec0" style={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18265a",
                            borderRadius: 10,
                            color: "#fff",
                            border: "0",
                          }}
                          labelStyle={{ color: "#fff" }}
                          formatter={(value) => [`${formatCurrency(value)} ₺`, "Gelir"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b60c5"
                          strokeWidth={4}
                          dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
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
            <div className="dashboard-card-hover card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <CardHeader
                  icon="📊"
                  title="İş Durumu Dağılımı"
                  text="Bekleyen, işlemde ve tamamlanan işler."
                />

                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#edf2fb" vertical={false} />
                      <XAxis dataKey="name" stroke="#a0aec0" style={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} stroke="#a0aec0" style={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: 10 }} />
                      <Bar dataKey="value" fill="#3b60c5" radius={[8, 8, 0, 0]} maxBarSize={52} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card-hover card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <CardHeader
                icon="📋"
                title="Son İş Emirleri"
                text="Servisteki son işlem kayıtları."
              />

              <Link
                to="/service/work-orders"
                className="btn btn-sm px-3 rounded-pill btn-outline-primary fw-semibold"
              >
                Tümünü Gör
              </Link>
            </div>

            {dashboard.recentWorkOrders.length === 0 ? (
              <EmptyState icon="🔧" text="Henüz iş emri yok." />
            ) : (
              <div className="d-flex flex-column gap-2">
                {dashboard.recentWorkOrders.map((order) => (
                  <div
                    key={order.id}
                    className="dashboard-row-hover d-flex justify-content-between align-items-center gap-3 flex-wrap p-3 rounded-3"
                  >
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ color: "#18265a" }}>
                        {order.title}
                      </h6>

                      <div className="text-muted small d-flex align-items-center gap-2 flex-wrap">
                        <span>
                          <i className="bi bi-person me-1" />
                          {order.customerName}
                        </span>
                        <span>•</span>
                        <span>
                          <i className="bi bi-car-front me-1" />
                          {order.vehicleName}
                        </span>
                        <span className="badge bg-light text-secondary border px-2 py-1">
                          {order.plate}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 flex-wrap ms-auto">
                      <span className={`badge rounded-pill px-3 py-2 ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>

                      <span className="fw-bold px-3 py-1 bg-light rounded text-dark">
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

        <style>{`
          .dashboard-hero {
            border-radius: 24px;
            background:
              radial-gradient(circle at top right, rgba(59, 96, 197, .14), transparent 35%),
              linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%);
          }

          .dashboard-hero-icon {
            width: 58px;
            height: 58px;
            border-radius: 18px;
            background: rgba(59,96,197,.12);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
          }

          .dashboard-card-hover {
            border-radius: 18px;
            transition: box-shadow .23s ease, transform .22s ease;
          }

          .dashboard-card-hover:hover {
            box-shadow: 0 14px 34px rgba(44, 62, 100, 0.16) !important;
            transform: translateY(-2px);
          }

          .dashboard-row-hover {
            background: #fdfdfd;
            border: 1px solid #eef2fb;
            transition: box-shadow .2s ease, transform .2s ease, background .18s ease;
          }

          .dashboard-row-hover:hover {
            background: #f5f9ff !important;
            box-shadow: 0 8px 22px rgba(44, 62, 100, 0.10);
            transform: translateX(4px);
          }
        `}</style>
      </div>
    </PageWrapper>
  );
}

function SectionTitle({ icon, title, text }) {
  return (
    <div className="d-flex align-items-start gap-2 mb-3 mt-2">
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div>
        <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 850 }}>
          {title}
        </h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  );
}

function CardHeader({ icon, title, text }) {
  return (
    <div>
      <h5 className="mb-1 fw-bold" style={{ color: "#18265a" }}>
        <span className="me-2">{icon}</span>
        {title}
      </h5>
      {text && <p className="text-muted small mb-0">{text}</p>}
    </div>
  );
}

function QuickMetric({ title, value, tone }) {
  return (
    <div className="col-6">
      <div
        className="rounded-4 p-3 h-100"
        style={{
          background: `${tone}12`,
          border: `1px solid ${tone}22`,
        }}
      >
        <div className="text-muted small">{title}</div>
        <div className="h5 fw-bold mb-0" style={{ color: "#18265a" }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, tone }) {
  const rgbaBg = tone.startsWith("#")
    ? `rgba(${parseInt(tone.slice(1, 3), 16)}, ${parseInt(
        tone.slice(3, 5),
        16,
      )}, ${parseInt(tone.slice(5, 7), 16)}, 0.12)`
    : "rgba(59, 96, 197, 0.12)";

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="dashboard-card-hover card border-0 shadow-sm h-100">
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0"
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

function InsightCard({ title, value, text, progress }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div
        className="dashboard-card-hover card border-0 shadow-sm h-100 p-2"
        style={{
          background: "linear-gradient(135deg, #fdfeff 0%, #f4f8ff 100%)",
          borderLeft: "4px solid #3b60c5",
        }}
      >
        <div className="card-body">
          <div className="text-muted small fw-semibold text-uppercase mb-1">
            {title}
          </div>

          <div className="h3 fw-bold mb-2" style={{ color: "#18265a" }}>
            {value}
          </div>

          <div className="progress mb-2" style={{ height: 6, borderRadius: 10 }}>
            <div
              className="progress-bar bg-primary rounded-pill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-muted small mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="text-center p-5 bg-light rounded-4">
      <div style={{ fontSize: 40 }}>{icon}</div>
      <h6 className="mt-3 fw-bold">{text}</h6>
      <p className="text-muted mb-0">Veri oluştuğunda burada görüntülenecek.</p>
    </div>
  );
}

export default ServiceDashboardPage;