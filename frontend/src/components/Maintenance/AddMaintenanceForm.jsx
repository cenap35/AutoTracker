import { useState } from "react";

function AddMaintenanceForm({ vehicles, onMaintenanceCreated, error }) {
  const [vehicleId, setVehicleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onMaintenanceCreated({
      vehicleId: Number(vehicleId),
      title,
      description,
      mileage: Number(mileage),
      cost: Number(cost),
      maintenanceDate,
    });

    setVehicleId("");
    setTitle("");
    setDescription("");
    setMileage("");
    setCost("");
    setMaintenanceDate("");
  };

  return (
    <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">
          <i className="bi bi-plus-circle me-2"></i>
          Yeni Bakım Ekle
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                required
              >
                <option value="">Araç seç</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Bakım başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={maintenanceDate}
                onChange={(e) => setMaintenanceDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="KM"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Masraf"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Açıklama..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12 text-end">
              <button className="btn btn-primary fw-bold px-4">
                <i className="bi bi-plus-lg me-1"></i>
                Bakım Ekle
              </button>
            </div>
          </div>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default AddMaintenanceForm;
