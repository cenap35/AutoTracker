import { useState } from "react";

function AddMaintenanceForm({ onCreate, vehicles = [], showVehicleSelect = false }) {
  const [vehicleId, setVehicleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      vehicleId: showVehicleSelect ? Number(vehicleId) : undefined,
      title,
      description,
      mileage: Number(mileage),
      cost: Number(cost),
      maintenanceDate: new Date(maintenanceDate).toISOString(),
    });

    setVehicleId("");
    setTitle("");
    setDescription("");
    setMileage("");
    setCost("");
    setMaintenanceDate("");
  };

  return (
    <div
    className="card border-0 shadow-sm mb-4"
    style={{
      borderRadius: 18,
      background: "linear-gradient(120deg, #ffffff 0%, #f5f8ff 100%)",
      boxShadow: "0 8px 28px -18px rgba(59, 96, 197, 0.45)",
    }}
  >
    <div className="card-body p-4">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <div>
          <h5 className="fw-bold mb-1" style={{ color: "#284185" }}>
            <i
              className="bi bi-wrench-adjustable me-2"
              style={{ color: "#3b60c5" }}
            ></i>
            Yeni Bakım Kaydı Ekle
          </h5>
          <p className="text-muted small mb-0">
            Bakım, onarım, kilometre ve masraf bilgilerini kaydedin.
          </p>
        </div>
  
        <span
          className="badge bg-primary-subtle text-primary border"
          style={{ borderRadius: 999, padding: "8px 12px" }}
        >
          <i className="bi bi-tools me-1"></i>
          Bakım
        </span>
      </div>
  
      <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
        {showVehicleSelect && (
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-muted">
              Araç
            </label>
            <select
              className="form-select shadow-none"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required
              style={{ borderRadius: 12, minHeight: 44 }}
            >
              <option value="">Araç seç</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.plateNumber} | {vehicle.brand} {vehicle.model}
                </option>
              ))}
            </select>
          </div>
        )}
  
        <div className={showVehicleSelect ? "col-12 col-md-4" : "col-12 col-md-4"}>
          <label className="form-label small fw-semibold text-muted">
            Başlık
          </label>
          <input
            className="form-control shadow-none"
            placeholder="Örn: Periyodik bakım"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>
  
        <div className={showVehicleSelect ? "col-12 col-md-4" : "col-12 col-md-8"}>
          <label className="form-label small fw-semibold text-muted">
            Açıklama
          </label>
          <input
            className="form-control shadow-none"
            placeholder="Örn: Yağ, filtre ve genel kontrol"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>
  
        <div className="col-12 col-md-3">
          <label className="form-label small fw-semibold text-muted">
            Kilometre
          </label>
          <input
            type="number"
            className="form-control shadow-none"
            placeholder="Km"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            min={0}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>
  
        <div className="col-12 col-md-3">
          <label className="form-label small fw-semibold text-muted">
            Maliyet
          </label>
          <input
            type="number"
            className="form-control shadow-none"
            placeholder="₺ Maliyet"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min={0}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>
  
        <div className="col-12 col-md-4">
          <label className="form-label small fw-semibold text-muted">
            Bakım Tarihi
          </label>
          <input
            type="datetime-local"
            className="form-control shadow-none"
            value={maintenanceDate}
            onChange={(e) => setMaintenanceDate(e.target.value)}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>
  
        <div className="col-12 col-md-2 d-flex justify-content-end">
          <button
            type="submit"
            className="btn fw-bold w-100"
            style={{
              borderRadius: 14,
              minHeight: 44,
              background: "linear-gradient(90deg, #3b60c5 0%, #284185 100%)",
              color: "#fff",
              boxShadow: "0 8px 18px -12px rgba(59, 96, 197, 0.8)",
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Ekle
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default AddMaintenanceForm;