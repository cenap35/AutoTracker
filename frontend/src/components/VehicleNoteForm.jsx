import { useState } from "react";

function VehicleNoteForm({ vehicles = [], selectedVehicleId, onCreate }) {
  const [vehicleId, setVehicleId] = useState(selectedVehicleId || "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Orta");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      vehicleId: Number(selectedVehicleId || vehicleId),
      title,
      content,
      priority,
    });

    setTitle("");
    setContent("");
    setPriority("Orta");

    if (!selectedVehicleId) {
      setVehicleId("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div
        className="border rounded-4 p-3 p-md-4 bg-body-tertiary shadow-sm"
        style={{
          borderColor: "rgba(13,110,253,.15)",
          transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          transform: "translateY(0px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 .75rem 1.5rem rgba(0,0,0,.08)";
          e.currentTarget.style.borderColor = "rgba(13,110,253,.28)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "rgba(13,110,253,.15)";
        }}
      >
        <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
              style={{ width: 34, height: 34 }}
            >
              <i className="bi bi-pencil-square"></i>
            </span>
            <div>
              <div className="fw-semibold text-dark">Yeni Not</div>
              <div className="text-muted small">Aracın için hızlıca not ekle.</div>
            </div>
          </div>
        </div>

        {!selectedVehicleId && (
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted small mb-1">
              Araç
            </label>
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

        <div className="mb-3">
          <label className="form-label fw-semibold text-muted small mb-1">
            Başlık
          </label>
          <input
            className="form-control"
            placeholder="Örn: Yağ değişimi hatırlatması"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-muted small mb-1">
            İçerik
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Detay ekleyebilirsin (opsiyonel)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-end">
          <div className="flex-grow-1">
            <label className="form-label fw-semibold text-muted small mb-1">
              Öncelik
            </label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Düşük">Düşük</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
            </select>
          </div>

          <button className="btn btn-primary px-4" type="submit">
            <i className="bi bi-plus-circle me-2"></i>
            Not Ekle
          </button>
        </div>
      </div>
    </form>
  );
}

export default VehicleNoteForm;