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
          <i className="bi bi-calendar-plus me-2" style={{ color: "#3b60c5" }}></i>
          Yeni Takip Ekle
        </h5>
        <p className="text-muted small mb-0">
          Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı kaydedin.
        </p>
      </div>

      <span
        className="badge bg-primary-subtle text-primary border"
        style={{ borderRadius: 999, padding: "8px 12px" }}
      >
        <i className="bi bi-bell me-1"></i>
        Hatırlatma
      </span>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="row g-3 align-items-end">
        {!selectedVehicleId && (
          <div className="col-12 col-md-3">
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
              <option value="">Araç seç...</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="col-12 col-md-2">
          <label className="form-label small fw-semibold text-muted">
            Takip Türü
          </label>
          <select
            className="form-select shadow-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ borderRadius: 12, minHeight: 44 }}
          >
            <option value="Sigorta">Sigorta</option>
            <option value="Kasko">Kasko</option>
            <option value="MTV">MTV</option>
            <option value="Muayene">Muayene</option>
          </select>
        </div>

        <div className="col-12 col-md-2">
          <label className="form-label small fw-semibold text-muted">
            Son Tarih
          </label>
          <input
            type="date"
            className="form-control shadow-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>

        <div className="col-12 col-md-2">
          <label className="form-label small fw-semibold text-muted">
            Tutar
          </label>
          <input
            type="number"
            className="form-control shadow-none"
            placeholder="₺ Tutar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>

        <div className={selectedVehicleId ? "col-12 col-md-4" : "col-12 col-md-3"}>
          <label className="form-label small fw-semibold text-muted">
            Açıklama
          </label>
          <input
            className="form-control shadow-none"
            placeholder="Örn: Poliçe yenileme, MTV 1. taksit..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ borderRadius: 12, minHeight: 44 }}
          />
        </div>

        <div className="col-12 d-flex justify-content-end mt-3">
          <button
            className="btn fw-bold px-4"
            type="submit"
            style={{
              borderRadius: 14,
              minHeight: 44,
              background: "linear-gradient(90deg, #3b60c5 0%, #284185 100%)",
              color: "#fff",
              boxShadow: "0 8px 18px -12px rgba(59, 96, 197, 0.8)",
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Takip Ekle
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

  );
}

export default ReminderForm;