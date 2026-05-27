import { useState } from "react";

function ReminderForm({ vehicles = [], selectedVehicleId, onCreate }) {
  const [vehicleId, setVehicleId] = useState(selectedVehicleId || "");
  const [type, setType] = useState("Sigorta");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      vehicleId: Number(selectedVehicleId || vehicleId),
      type,
      dueDate: new Date(dueDate).toISOString(),
      amount: amount ? Number(amount) : null,
      description,
    });

    if (!selectedVehicleId) {
      setVehicleId("");
    }

    setType("Sigorta");
    setDueDate("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
      <div className="card-body">
        <h5 className="fw-bold mb-3">Yeni Takip Ekle</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            {!selectedVehicleId && (
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                >
                  <option value="">Araç seç...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="col-md-2">
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Sigorta">Sigorta</option>
                <option value="Kasko">Kasko</option>
                <option value="MTV">MTV</option>
                <option value="Muayene">Muayene</option>
              </select>
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Tutar"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className={selectedVehicleId ? "col-md-4" : "col-md-3"}>
              <input
                className="form-control"
                placeholder="Açıklama"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12 text-end mt-3">
              <button className="btn btn-primary fw-bold" type="submit">
                <i className="bi bi-plus-circle me-1"></i>
                Ekle
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReminderForm;