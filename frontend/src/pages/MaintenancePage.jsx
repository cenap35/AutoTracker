import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import { getMaintenanceRecords } from "../services/maintenanceService";

function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("all");

  useEffect(() => {
    const fetchAllMaintenanceRecords = async () => {
      try {
        const vehicles = await getVehicles();
        setVehicles(vehicles);

        const allRecords = await Promise.all(
          vehicles.map(async (vehicle) => {
            const maintenanceRecords = await getMaintenanceRecords(vehicle.id);

            return maintenanceRecords.map((record) => ({
              ...record,
              vehicleId: vehicle.id,
              vehicleName: `${vehicle.brand} ${vehicle.model}`,
              plateNumber: vehicle.plateNumber,
            }));
          }),
        );

        setRecords(allRecords.flat());
      } catch (err) {
        setError("Bakım kayıtları yüklenemedi.");
        console.error(err);
      }
    };

    fetchAllMaintenanceRecords();
  }, []);

  const filteredRecords =
    selectedVehicleId === "all"
      ? records
      : records.filter(
          (record) => record.vehicleId === Number(selectedVehicleId),
        );

  return (
    <PageWrapper>
      <div
        className="container py-5"
        style={{
          minHeight: "calc(100vh - 90px)",
          background:
            "radial-gradient(circle at 80% 20%, #e6edff 0%, #f8fbff 80%)",
          borderRadius: 26,
          boxShadow: "0 4px 42px -14px #3b60c533",
        }}
      >
        <div className="mb-5 text-center">
          <h1
            className="fw-bold"
            style={{
              color: "#294686",
              fontSize: 38,
              letterSpacing: "1.5px",
              textShadow: "1px 2px 12px #e0e7ff",
            }}
          >
            <i
              className="bi bi-tools me-2"
              style={{
                color: "#3b60c5",
                fontSize: 36,
                textShadow: "2px 4px 12px #e6edff77",
              }}
            ></i>
            Bakımlar
          </h1>
          <p
            className="mt-2"
            style={{
              color: "#546e8c",
              fontSize: 18,
              opacity: .9,
              fontWeight: 500,
            }}
          >
            Tüm araçlarınıza ait bakım kayıtlarını şık ve düzenli bir ekranda görüntüleyin.
          </p>
        </div>

        <div
          className="mb-4 mx-auto p-3"
          style={{
            maxWidth: 420,
            background:
              "linear-gradient(87deg, #eef2fd 60%, #f7f9fd 100%)",
            borderRadius: 15,
            boxShadow: "0 2px 12px -5px #3b60c529",
          }}
        >
          <label className="form-label fw-semibold mb-1" style={{ color: "#355" }}>
            Araca göre filtrele
          </label>
          <select
            className="form-select shadow-none"
            style={{
              borderRadius: 8,
              background: "#fcfdff",
              borderColor: "#bfd5f7",
              fontWeight: 500,
            }}
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
          >
            <option value="all" style={{ fontWeight: 600 }}>
              🚗 Tüm araçlar
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div
            className="alert alert-danger text-center"
            style={{ borderRadius: 11 }}
          >
            {error}
          </div>
        )}

        {filteredRecords.length === 0 ? (
          <div
            className="alert alert-info shadow-sm mt-4 text-center"
            style={{
              borderRadius: 16,
              background: "#f6fbff",
              color: "#365",
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: ".2px",
            }}
          >
            <i className="bi bi-emoji-frown me-2"></i>
            Henüz bakım kaydı bulunmuyor.
          </div>
        ) : (
          <div className="row g-4">
            {filteredRecords.map((record, idx) => (
              <div className="col-md-6 col-lg-4" key={record.id}>
                <div
                  className="card border-0 shadow h-100 maintenance-card"
                  style={{
                    borderRadius: 22,
                    overflow: "hidden",
                    background: "linear-gradient(140deg, #f3f7fd 78%, #fff 100%)",
                    boxShadow:
                      "0 10px 32px -12px #3b60c52b, 0 1px 0 0 #3b60c511",
                    transition: "transform .15s cubic-bezier(.4,0,.2,1), box-shadow .18s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.025) translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px -8px #3b60c585, 0 4px 0 0 #3b60c511";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow =
                      "0 10px 32px -12px #3b60c52b, 0 1px 0 0 #3b60c511";
                  }}
                >
                  <div className="card-body px-4 pb-4 pt-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5
                        className="fw-bold mb-0"
                        style={{
                          color: "#345",
                          fontSize: 20,
                          letterSpacing: ".1px",
                        }}
                        title={record.title}
                      >
                        <i className="bi bi-wrench-adjustable me-2 text-info"></i>
                        {record.title}
                      </h5>
                      <span
                        className="badge bg-gradient bg-primary shadow"
                        style={{
                          fontSize: 16,
                          padding: "7px 15px",
                          borderRadius: 9,
                          boxShadow: "0 2px 10px -6px #3b60c577",
                          letterSpacing: ".3px",
                        }}
                      >
                        ₺{Number(record.cost).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="mb-2 d-flex align-items-center gap-2 small text-secondary">
                      <i className="bi bi-car-front-fill text-warning"></i>
                      <span style={{ fontWeight: 600 }}>
                        {record.vehicleName}
                      </span>
                      <span className="badge bg-light border ms-2" style={{ fontSize: 13, color: "#355" }}>
                        {record.plateNumber}
                      </span>
                    </div>
                    {record.description && (
                      <p className="small text-muted border-start border-3 ps-2 mb-1" style={{borderColor:"#3b60c555"}}>
                        {record.description}
                      </p>
                    )}
                    <div className="d-flex flex-wrap gap-2 mb-3 mt-2">
                      <span className="badge bg-light text-dark border" style={{ fontWeight: 500 }}>
                        <i className="bi bi-speedometer2 me-1"></i>
                        {record.mileage?.toLocaleString("tr-TR")} km
                      </span>
                      <span className="badge bg-light text-dark border" style={{ fontWeight: 500 }}>
                        <i className="bi bi-calendar-event me-1"></i>
                        {new Date(record.maintenanceDate).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <div className="mt-auto text-end">
                      <Link
                        to={`/vehicles/${record.vehicleId}`}
                        className="btn btn-outline-primary btn-sm fw-bold"
                        style={{
                          borderRadius: 7,
                          fontSize: 15,
                          letterSpacing: "0.7px",
                          background: "#fafdff",
                          boxShadow: "0 2px 10px -7px #3b60c550",
                        }}
                      >
                        <i className="bi bi-search me-1"></i>
                        Araç Detayına Git
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
    </PageWrapper>
  );
}

export default MaintenancePage;
