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
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold text-primary">
            <i className="bi bi-tools me-2"></i>
            Bakımlar
          </h1>
          <p className="text-muted">
            Tüm araçlarınıza ait bakım kayıtlarını tek ekranda görüntüleyin.
          </p>
        </div>

        <div className="mb-4" style={{ maxWidth: 360 }}>
          <label className="form-label fw-semibold">Araca göre filtrele</label>
          <select
            className="form-select"
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
          >
            <option value="all">Tüm araçlar</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {filteredRecords.length === 0 ? (
          <div className="alert alert-info shadow-sm">
            Henüz bakım kaydı bulunmuyor.
          </div>
        ) : (
          <div className="row g-4">
            {filteredRecords.map((record) => (
              <div className="col-md-6 col-lg-4" key={record.id}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ borderRadius: 16 }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0">{record.title}</h5>

                      <span className="badge bg-primary">
                        ₺{Number(record.cost).toLocaleString("tr-TR")}
                      </span>
                    </div>

                    <p className="text-muted mb-2">
                      <i className="bi bi-car-front-fill me-1"></i>
                      {record.vehicleName} - {record.plateNumber}
                    </p>

                    {record.description && (
                      <p className="small text-muted">{record.description}</p>
                    )}

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-speedometer2 me-1"></i>
                        {record.mileage?.toLocaleString("tr-TR")} km
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-calendar-event me-1"></i>
                        {new Date(record.maintenanceDate).toLocaleDateString(
                          "tr-TR",
                        )}
                      </span>
                    </div>

                    <Link
                      to={`/vehicles/${record.vehicleId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Araç Detayına Git
                    </Link>
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
