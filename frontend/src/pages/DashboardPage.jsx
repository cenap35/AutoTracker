import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import StatsCard from "../components/Dashboard/StatsCard";
import CostByVehicleChart from "../components/Dashboard/CostByVehicleChart";
import DashboardBackground from "../components/Dashboard/DashboardBackground";
import MaintenanceCard from "../components/MaintenanceCard";
import {
  getDashboardSummary,
  getRecentMaintenance,
  getCostByVehicle,
} from "../services/dashboardService";
import { getVehicles } from "../services/vehicleService";

const QUICK_ACTIONS = [
  {
    to: "/vehicles",
    icon: "bi-plus-circle-fill",
    iconClass: "text-primary",
    title: "Araç ekle",
    text: "Yeni araç kaydı oluştur",
    titleColor: "#284185",
    bg: "linear-gradient(110deg, #eef5ff 65%, #ffffff 100%)",
  },
  {
    to: "/maintenance",
    icon: "bi-wrench-adjustable-circle-fill",
    iconClass: "text-success",
    title: "Bakım ekle",
    text: "Bakım ve masraf kaydı gir",
    titleColor: "#286b52",
    bg: "linear-gradient(110deg, #eefcf5 65%, #ffffff 100%)",
  },
  {
    to: "/reports",
    icon: "bi-bar-chart-line-fill",
    iconClass: "text-warning",
    title: "Raporlar",
    text: "Yapılacakları ve notları takip et",
    titleColor: "#8a6514",
    bg: "linear-gradient(110deg, #fff8e8 65%, #ffffff 100%)",
  },
  {
    to: "/vehicles",
    icon: "bi-car-front-fill",
    iconClass: "",
    iconStyle: { color: "#5b4fd6" },
    title: "Tüm araçlar",
    text: "Araç listesini görüntüle",
    titleColor: "#3e348f",
    bg: "linear-gradient(110deg, #f2f0ff 65%, #ffffff 100%)",
  },
];

function SectionTitle({ icon, children, action }) {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <h2
        className="h5 fw-bold m-0 d-flex align-items-center gap-2"
        style={{ color: "#284185", letterSpacing: "0.3px" }}
      >
        <i className={`bi ${icon}`} style={{ color: "#3b60c5" }} />
        {children}
      </h2>
      {action}
    </div>
  );
}

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [recentMaintenance, setRecentMaintenance] = useState([]);
  const [costByVehicle, setCostByVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const [data, maintenanceData, costData, vehiclesData] =
          await Promise.all([
            getDashboardSummary(),
            getRecentMaintenance(),
            getCostByVehicle(),
            getVehicles(),
          ]);
        setSummary(data);
        setRecentMaintenance(maintenanceData);
        setCostByVehicle(costData);
        setVehicles(vehiclesData);
      } catch (err) {
        console.error(err);
        setError("Panel verileri yüklenemedi. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <DashboardBackground>
          <div
            className="container d-flex flex-column align-items-center justify-content-center py-5"
            style={{ minHeight: "calc(100vh - 72px)" }}
          >
            <div
              className="spinner-border mb-3"
              style={{ color: "#3b60c5", width: "2.5rem", height: "2.5rem" }}
              role="status"
            />
            <p className="text-muted mb-0">Panel yükleniyor…</p>
          </div>
        </DashboardBackground>
      </PageWrapper>
    );
  }

  if (error || !summary) {
    return (
      <PageWrapper>
        <DashboardBackground>
          <div className="container py-5">
            <div className="alert alert-danger shadow-sm rounded-3 text-center">
              <i className="bi bi-exclamation-triangle me-2" />
              {error || "Veri alınamadı."}
            </div>
          </div>
        </DashboardBackground>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <DashboardBackground>
        <div className="container py-4 py-lg-5">
          {/* Header */}
          <div className="row mb-4 mb-lg-5 align-items-center g-3">
            <div className="col-lg-8">
              <p
                className="small text-uppercase fw-semibold mb-1"
                style={{ color: "#3b60c5", letterSpacing: "1px" }}
              >
                Kontrol paneli
              </p>
              <h1 className="h2 fw-bold mb-2" style={{ color: "#284185" }}>
                <i
                  className="bi bi-speedometer2 me-2"
                  style={{ color: "#3b60c5" }}
                />
                {fullName ? `Merhaba, ${fullName}` : "Hoş geldiniz"}
              </h1>
              <p
                className="mb-0"
                style={{ color: "#4a5b75", maxWidth: 560, lineHeight: 1.55 }}
              >
                Araçlarınızın özetini, son bakımları ve masraf dağılımını tek
                ekranda takip edin.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="row g-3 g-md-4 mb-4 mb-lg-5">
            <StatsCard
              icon="bi-truck-front-fill"
              title="Toplam araç"
              value={summary.totalVehicles || 0}
              iconColor="#2357b1"
              iconBg="#f2f7ff"
              background="linear-gradient(110deg, #eaf2ff 60%, #eff5fc 100%)"
            />
            <StatsCard
              icon="bi-wrench-adjustable"
              title="Bakım kaydı"
              value={summary.totalMaintenanceRecords || 0}
              iconColor="#1a906c"
              iconBg="#edfff7"
              background="linear-gradient(110deg, #eaf9ef 65%, #f8fff9 100%)"
            />
            <StatsCard
              icon="bi-currency-exchange"
              title="Toplam bakım masrafı"
              value={`₺${(summary.totalMaintenanceCost ?? 0).toLocaleString("tr-TR")}`}
              iconColor="#b78b16"
              iconBg="#fff8e2"
              background="linear-gradient(110deg, #fff5de 67%, #fffdf6 100%)"
            />
          </div>

          {/* Chart + quick actions */}
          <div className="row g-4 mb-4 mb-lg-5">
            <div className="col-lg-8">
              <CostByVehicleChart data={costByVehicle} />
            </div>
            <div className="col-lg-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.97)",
                  border: "1.3px solid #e3eafb",
                }}
              >
                <div className="card-body p-3 p-lg-4">
                  <h3 className="h6 fw-bold mb-3" style={{ color: "#284185" }}>
                    <i
                      className="bi bi-lightning-charge-fill me-2"
                      style={{ color: "#f7d358" }}
                    />
                    Hızlı işlemler
                  </h3>
                  <div className="d-grid gap-2">
                    {QUICK_ACTIONS.map((action) => (
                      <Link
                        key={action.title}
                        to={action.to}
                        className="text-decoration-none dashboard-quick-link"
                      >
                        <div
                          className="d-flex align-items-center gap-3 p-3 rounded-3"
                          style={{
                            background: action.bg,
                            transition: "transform 0.15s",
                          }}
                        >
                          <i
                            className={`bi ${action.icon} fs-4 ${action.iconClass}`}
                            style={action.iconStyle}
                          />
                          <div>
                            <div
                              className="fw-bold small"
                              style={{ color: action.titleColor }}
                            >
                              {action.title}
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.78rem" }}
                            >
                              {action.text}
                            </div>
                          </div>
                          <i className="bi bi-chevron-right ms-auto text-muted" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent maintenance */}
          <section className="mb-4 mb-lg-5">
            <SectionTitle
              icon="bi-tools"
              action={
                <Link
                  to="/maintenance"
                  className="btn btn-sm fw-semibold px-3"
                  style={{
                    borderRadius: 18,
                    color: "#3b60c5",
                    border: "2px solid #3b60c5",
                    background: "rgba(59, 96, 197, 0.06)",
                  }}
                >
                  Tüm bakımlar
                  <i className="bi bi-arrow-right ms-1" />
                </Link>
              }
            >
              Son bakımlar
            </SectionTitle>

            {recentMaintenance.length === 0 ? (
              <div className="alert alert-light border text-center shadow-sm rounded-3 mb-0">
                <i className="bi bi-inbox me-2 text-muted" />
                Henüz bakım kaydı yok.
                <Link to="/maintenance" className="ms-2 fw-semibold">
                  İlk kaydı ekle
                </Link>
              </div>
            ) : (
              <div className="row g-3">
                {recentMaintenance.map((record) => (
                  <div className="col-md-6 col-xl-4" key={record.id}>
                    <MaintenanceCard record={record} showVehicleInfo />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Vehicles */}
          <section>
            <SectionTitle
              icon="bi-car-front-fill"
              action={
                <Link
                  to="/vehicles"
                  className="btn btn-outline-primary btn-sm border-2 px-3 rounded-pill fw-semibold"
                >
                  Tümünü gör
                  <i className="bi bi-arrow-right-short ms-1" />
                </Link>
              }
            >
              Araçlarım
              <span className="badge bg-primary-subtle text-primary ms-2 fw-semibold">
                {vehicles.length}
              </span>
            </SectionTitle>

            {vehicles.length === 0 ? (
              <div
                className="card border-0 shadow-sm text-center py-5"
                style={{
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.95)",
                }}
              >
                <i className="bi bi-car-front display-6 text-muted mb-2" />
                <p className="text-muted mb-3">Henüz kayıtlı aracınız yok.</p>
                <Link
                  to="/vehicles"
                  className="btn fw-bold px-4"
                  style={{
                    borderRadius: 18,
                    background:
                      "linear-gradient(90deg, #3b60c5 55%, #314286 100%)",
                    color: "#ffe082",
                    border: "2px solid #f7d358",
                  }}
                >
                  <i className="bi bi-plus-lg me-2" />
                  İlk aracı ekle
                </Link>
              </div>
            ) : (
              <div className="row g-3">
                {vehicles.map((vehicle) => (
                  <div className="col-sm-6 col-lg-4" key={vehicle.id}>
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="text-decoration-none dashboard-vehicle-link"
                    >
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                          borderRadius: 16,
                          background:
                            "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                          transition: "transform 0.15s, box-shadow 0.15s",
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span
                              className="badge fw-semibold"
                              style={{
                                background:
                                  "linear-gradient(90deg, #3b60c5, #314286)",
                                color: "#ffe082",
                                fontSize: "0.85rem",
                                padding: "6px 12px",
                                borderRadius: 12,
                              }}
                            >
                              {vehicle.plateNumber}
                            </span>
                            <span className="badge bg-light text-dark border">
                              {vehicle.year}
                            </span>
                          </div>
                          <h3
                            className="h6 fw-bold mb-2"
                            style={{ color: "#274a78" }}
                          >
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="small text-muted mb-0">
                            <i className="bi bi-speedometer2 me-1" />
                            {(vehicle.currentMileage ?? 0).toLocaleString(
                              "tr-TR",
                            )}{" "}
                            km
                          </p>
                          <span
                            className="small fw-semibold d-inline-block mt-3"
                            style={{ color: "#3b60c5" }}
                          >
                            Detaylar
                            <i className="bi bi-arrow-right ms-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <style>{`
          .dashboard-quick-link:hover > div {
            transform: translateX(4px);
          }
          .dashboard-vehicle-link:hover .card {
            transform: translateY(-3px);
            box-shadow: 0 10px 28px #3b60c522 !important;
          }
          .dashboard-stat:hover {
            box-shadow: 0 8px 24px #3b60c518 !important;
          }
        `}</style>
      </DashboardBackground>
    </PageWrapper>
  );
}

export default DashboardPage;
