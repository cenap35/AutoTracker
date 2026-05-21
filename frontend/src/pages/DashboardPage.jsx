import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { getVehicles } from "../services/vehicleService";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getRecentMaintenance } from "../services/dashboardService";
import StatsCard from "../components/Dashboard/StatsCard";
import CostByVehicleChart from "../components/Dashboard/CostByVehicleChart";
import DashboardBackground from "../components/Dashboard/DashboardBackground";
import { getCostByVehicle } from "../services/dashboardService";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [recentMaintenance, setRecentMaintenance] = useState([]);
  const [costByVehicle, setCostByVehicle] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);

        const maintenanceData = await getRecentMaintenance();
        setRecentMaintenance(maintenanceData);

        const costData = await getCostByVehicle();
        setCostByVehicle(costData);

        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper>
      <DashboardBackground>
        <div className="container py-4">
          {/* HEADER */}
          <div className="row mb-4 align-items-center">
            <div className="col-md-8">
              <h1
                className="display-4 fw-bold"
                style={{
                  color: "#284185",
                  letterSpacing: "1.5px",
                  textShadow: "0 2px 8px #c9d5ee73",
                }}
              >
                <i className="bi bi-speedometer2 me-2"></i> Kontrol Paneli
              </h1>
              <p className="lead" style={{ color: "#4a5b75", maxWidth: 620 }}>
                Hoş geldiniz! Araçlarınızın özet bilgilerini, bakım
                masraflarınızı ve son güncellemeleri şık ve sade bir panelde
                görüntüleyin.
              </p>
            </div>
            <div className="col-md-4 text-end">
              <div
                className="d-flex justify-content-end align-items-center h-100"
                style={{
                  height: "100%",
                  minHeight: 120,
                  position: "relative",
                }}
              >
                <span
                  className="d-none d-md-inline-flex justify-content-center align-items-center position-relative"
                  style={{
                    background:
                      "linear-gradient(122deg, #415fcebb 58%, #3e8cdf 90%, #41c8e8 100%)",
                    borderRadius: "50%",
                    padding: "27px 32px 23px 32px",
                    border: "3.5px solid #f6da72",
                    boxShadow: "0 8px 38px #496be64c, 0 1.5px 0 #fffbe0",
                    maxHeight: 140,
                    minWidth: 124,
                    fontSize: 70,
                    color: "#fff",
                    zIndex: 2,
                    overflow: "visible",
                  }}
                  title="Havalı Araç Sticker"
                  role="img"
                  aria-label="Havalı Araç Sticker"
                >
                  <i
                    className="bi bi-car-front-fill"
                    style={{ textShadow: "0 4px 34px #2b538544" }}
                  ></i>
                  {/* headlight effect */}
                  <span
                    style={{
                      position: "absolute",
                      left: 20,
                      bottom: 15,
                      width: 12,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, #ffe082cc 65%, #fff0 85%)",
                      filter: "blur(0.5px)",
                      opacity: 0.85,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 18,
                      bottom: 15,
                      width: 12,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, #ffe082cc 65%, #fff0 85%)",
                      filter: "blur(0.5px)",
                      opacity: 0.85,
                    }}
                  />
                  {/* speed blur effect */}
                  <span
                    style={{
                      position: "absolute",
                      right: 13,
                      top: 38,
                      width: 28,
                      height: 9,
                      borderRadius: "10px",
                      background:
                        "linear-gradient(108deg, #55c8fa55 10%, #fff0 100%)",
                      transform: "rotate(12deg)",
                      opacity: 0.55,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: 42,
                      width: 23,
                      height: 9,
                      borderRadius: "15px",
                      background:
                        "linear-gradient(90deg, #fff0, #7ed8ff55 80%)",
                      transform: "rotate(-13deg)",
                      opacity: 0.5,
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/*Display StatsCard components for the dashboard statistics */}

          <div className="row mb-5 g-4 justify-content-center">
            <StatsCard
              icon="bi-truck-front-fill"
              title="Toplam Araç"
              value={summary.totalVehicles || 0}
              iconColor="#2357b1"
              iconBg="#f2f7ff"
              background="linear-gradient(110deg, #eaf2ff 60%, #eff5fc 100%)"
            />

            <StatsCard
              icon="bi-wrench-adjustable"
              title="Bakım Kaydı"
              value={summary.totalMaintenanceRecords || 0}
              iconColor="#1a906c"
              iconBg="#edfff7"
              background="linear-gradient(110deg, #eaf9ef 65%, #f8fff9 100%)"
            />

            <StatsCard
              icon="bi-currency-exchange"
              title="Toplam Bakım Masrafı"
              value={`₺${summary.totalMaintenanceCost?.toLocaleString("tr-TR") || "0"}`}
              iconColor="#b78b16"
              iconBg="#fff8e2"
              background="linear-gradient(110deg, #fff5de 67%, #fffdf6 100%)"
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="row mb-5 g-4">
            <div className="col-md-3 col-sm-6">
              <Link to="/vehicles" className="text-decoration-none">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #eef5ff 65%, #ffffff 100%)",
                  }}
                >
                  <div className="card-body text-center py-4">
                    <i className="bi bi-plus-circle-fill fs-1 text-primary"></i>
                    <h5
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#284185" }}
                    >
                      Araç Ekle
                    </h5>
                    <p className="text-muted small mb-0">
                      Yeni araç kaydı oluştur
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/maintenance" className="text-decoration-none">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #eefcf5 65%, #ffffff 100%)",
                  }}
                >
                  <div className="card-body text-center py-4">
                    <i className="bi bi-wrench-adjustable-circle-fill fs-1 text-success"></i>
                    <h5
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#286b52" }}
                    >
                      Bakım Ekle
                    </h5>
                    <p className="text-muted small mb-0">
                      Bakım ve masraf kaydı gir
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/reports" className="text-decoration-none">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #fff8e8 65%, #ffffff 100%)",
                  }}
                >
                  <div className="card-body text-center py-4">
                    <i className="bi bi-journal-plus fs-1 text-warning"></i>
                    <h5
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#8a6514" }}
                    >
                      Not Ekle
                    </h5>
                    <p className="text-muted small mb-0">
                      Araç için yapılacak notu yaz
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6">
              <Link to="/vehicles" className="text-decoration-none">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #f2f0ff 65%, #ffffff 100%)",
                  }}
                >
                  <div className="card-body text-center py-4">
                    <i
                      className="bi bi-car-front-fill fs-1"
                      style={{ color: "#5b4fd6" }}
                    ></i>
                    <h5
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#3e348f" }}
                    >
                      Tüm Araçlar
                    </h5>
                    <p className="text-muted small mb-0">
                      Araç listesini görüntüle
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* RECENT MAINTENANCE */}
          <div className="container mb-3">
            <h2
              className="mt-5 mb-4 fw-bold"
              style={{ color: "#365d96", letterSpacing: "1px" }}
            >
              <i className="bi bi-tools me-2"></i> Son Bakımlar
            </h2>

            <div className="row gx-4 gy-3">
              {recentMaintenance.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-info text-center shadow-sm rounded-3">
                    Son bakım kaydı bulunamadı.
                  </div>
                </div>
              ) : (
                recentMaintenance.map((record) => (
                  <div className="col-md-6" key={record.id}>
                    <div
                      className="card shadow-lg rounded-4 border-0 h-100 dashboard-maintenance-card"
                      style={{
                        background:
                          "linear-gradient(104deg, #eaf2ff 65%, #fffaf2 100%)",
                        borderLeft: "5px solid #4468d6",
                        overflow: "hidden",
                        minHeight: 180,
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <div className="card-body py-4 px-4 d-flex flex-column h-100">
                        <div className="d-flex align-items-center mb-2 gap-2">
                          <div
                            className="me-3 d-flex align-items-center justify-content-center shadow-sm"
                            style={{
                              width: 46,
                              height: 46,
                              background: "#fcfcfc",
                              border: "2px solid #cedaed",
                              borderRadius: 14,
                              fontSize: 30,
                              color: "#3953ad",
                            }}
                          >
                            <i className="bi bi-tools"></i>
                          </div>
                          <div>
                            <h5
                              className="mb-1 fw-bold"
                              style={{ color: "#314286", fontSize: 21 }}
                            >
                              {record.title}
                            </h5>
                            <span
                              className="badge text-bg-light text-secondary border px-2 py-1 shadow-sm"
                              style={{ fontSize: 13, background: "#eee" }}
                            >
                              {record.vehicleName} - {record.plateNumber}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3 mt-2">
                          <span
                            className="badge bg-warning-subtle text-dark py-2 px-3 shadow-sm"
                            style={{
                              borderRadius: 12,
                              fontSize: 15,
                              minWidth: 100,
                              border: "1.5px solid #ffe1ad",
                            }}
                          >
                            <i className="bi bi-currency-exchange me-1"></i>₺
                            {Number(record.cost).toLocaleString("tr-TR")}
                          </span>
                          <span
                            className="badge bg-light text-primary py-2 px-3 shadow-sm border"
                            style={{
                              borderRadius: 12,
                              fontSize: 15,
                              minWidth: 100,
                              border: "1.5px solid #cfe2ff",
                            }}
                          >
                            <i className="bi bi-graph-up-arrow me-1"></i>
                            {record.mileage.toLocaleString("tr-TR")} km
                          </span>
                          {record.maintenanceDate && (
                            <span
                              className="badge bg-secondary-subtle text-dark py-2 px-3 shadow-sm"
                              style={{
                                borderRadius: 12,
                                fontSize: 15,
                                border: "1.5px solid #eadafd",
                              }}
                            >
                              <i className="bi bi-calendar-event me-1"></i>
                              {new Date(
                                record.maintenanceDate,
                              ).toLocaleDateString("tr-TR")}
                            </span>
                          )}
                        </div>
                        {record.description && (
                          <div className="small mb-2 text-muted d-flex align-items-center gap-1">
                            <i className="bi bi-chat-left-text"></i>
                            <span>{record.description}</span>
                          </div>
                        )}
                        <div className="mt-auto text-end">
                          <small className="text-secondary">
                            Kayıt:{" "}
                            {record.createdAt
                              ? new Date(record.createdAt).toLocaleDateString(
                                  "tr-TR",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  },
                                )
                              : "-"}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* VEHICLES LIST */}
          <div className="mb-4 d-flex align-items-center justify-content-between mt-5">
            <h2 className="h4 fw-bold text-primary m-0 d-flex align-items-center gap-1">
              <i className="bi bi-car-front-fill me-2"></i> Araçlarım
            </h2>
            <Link
              to="/vehicles"
              className="btn btn-outline-primary btn-sm border-2 px-3 py-1 rounded-pill fw-semibold"
            >
              Tümünü Gör <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          {vehicles.length === 0 && (
            <div className="alert alert-info shadow-sm rounded-3">
              Henüz hiç aracınız yok. Şimdi bir araç ekleyin!
            </div>
          )}
          <div className="row g-4">
            {vehicles.map((vehicle) => (
              <div className="col-md-6 col-lg-4" key={vehicle.id}>
                <div
                  className="card h-100 shadow-sm border-0 vehicle-card position-relative"
                  style={{
                    background:
                      "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                    borderRadius: 16,
                    transition: "box-shadow 0.18s",
                  }}
                >
                  <div className="card-body pb-3">
                    <div className="mb-2 d-flex align-items-center gap-2">
                      <span
                        className="badge bg-primary me-2"
                        style={{
                          fontSize: 15,
                          letterSpacing: ".5px",
                          padding: "8px 13px",
                          borderRadius: 16,
                          boxShadow: "0 1px 5px #2457ab18",
                        }}
                      >
                        {vehicle.plateNumber}
                      </span>
                      <span
                        className="badge bg-light text-dark border ms-1"
                        style={{
                          fontSize: 13,
                          borderRadius: 13,
                          padding: "5px 12px",
                        }}
                      >
                        {vehicle.year}
                      </span>
                    </div>
                    <h5
                      className="card-title fw-bold mb-1"
                      style={{
                        color: "#274a78",
                        fontSize: 20,
                        letterSpacing: ".5px",
                      }}
                    >
                      {vehicle.brand} {vehicle.model}
                    </h5>
                    <div className="mb-3 small text-muted d-flex align-items-center gap-1">
                      <i className="bi bi-speedometer2 me-1"></i>
                      <span>
                        {vehicle.currentMileage?.toLocaleString("tr-TR") || 0}{" "}
                        km
                      </span>
                    </div>
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="stretched-link fw-bold text-decoration-none"
                      style={{ color: "#3b60c5" }}
                    >
                      Detaylar <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphic CostbyVehicle */}
        <CostByVehicleChart data={costByVehicle} />
      </DashboardBackground>
    </PageWrapper>
  );
}

export default DashboardPage;
