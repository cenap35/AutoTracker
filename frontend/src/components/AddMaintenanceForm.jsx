import { useState } from "react";
import { toast } from "react-toastify";

function AddMaintenanceForm({
  onCreate,
  vehicles = [],
  showVehicleSelect = false,
}) {
  const [vehicleId, setVehicleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      toast.error("Başlık boş olamaz.");
      return;
    }

    if (title.length > 80) {
      toast.error("Başlık en fazla 80 karakter olabilir.");
      return;
    }

    if (description.length > 300) {
      toast.error("Açıklama en fazla 300 karakter olabilir.");
      return;
    }

    if (Number(mileage) < 0 || Number(mileage) > 2000000) {
      toast.error("KM değeri 0 ile 2.000.000 arasında olmalıdır.");
      return;
    }

    if (Number(cost) < 0 || Number(cost) > 10000000) {
      toast.error("Maliyet 0 ile 10.000.000 arasında olmalıdır.");
      return;
    }

    try {
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
    } catch (err) {
      toast.error("Bakım kaydı eklenemedi.");
      console.error(err);
    }
  };

  return (
    <div
      className="card border-0 shadow-sm mb-4"
      style={{
        borderRadius: 18,
        background: "rgba(255,255,255,0.97)",
        border: "1.3px solid #e3eafb",
        boxShadow: "0 8px 28px -18px rgba(59, 96, 197, 0.45)",
      }}
    >
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-4">
          <div>
            <p
              className="small text-uppercase fw-semibold mb-1"
              style={{ color: "#3b60c5", letterSpacing: "1px" }}
            >
              Bakım kaydı
            </p>

            <h5 className="fw-bold mb-1" style={{ color: "#284185" }}>
              <i
                className="bi bi-wrench-adjustable me-2"
                style={{ color: "#3b60c5" }}
              />
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
            <i className="bi bi-tools me-1" />
            Bakım
          </span>
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          {showVehicleSelect && (
            <div className="col-12 col-lg-4">
              <label className="form-label small fw-semibold text-muted">
                Araç
              </label>

              <select
                className="form-select shadow-none"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                required
                style={{
                  borderRadius: 12,
                  minHeight: 44,
                  borderColor: "#d9e4f5",
                }}
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

          <div
            className={
              showVehicleSelect ? "col-12 col-lg-4" : "col-12 col-lg-4"
            }
          >
            <label className="form-label small fw-semibold text-muted">
              Başlık
            </label>

            <input
              className="form-control shadow-none"
              placeholder="Örn: Periyodik bakım"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              required
              style={{
                borderRadius: 12,
                minHeight: 44,
                borderColor: "#d9e4f5",
              }}
            />

            <div
              className={`text-end small mt-1 ${
                title.length >= 80 ? "text-danger fw-semibold" : "text-muted"
              }`}
            >
              {title.length}/80
              {title.length >= 80 && (
                <span className="ms-2">Karakter sınırına ulaşıldı.</span>
              )}
            </div>
          </div>

          <div
            className={
              showVehicleSelect ? "col-12 col-lg-4" : "col-12 col-lg-8"
            }
          >
            <label className="form-label small fw-semibold text-muted">
              Açıklama
            </label>

            <textarea
              className="form-control shadow-none"
              placeholder="Örn: Yağ, filtre ve genel kontrol"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              rows={2}
              required
              style={{
                borderRadius: 12,
                minHeight: 44,
                borderColor: "#d9e4f5",
                resize: "vertical",
              }}
            />

            <div
              className={`text-end small mt-1 ${
                description.length >= 300
                  ? "text-danger fw-semibold"
                  : "text-muted"
              }`}
            >
              {description.length}/300
              {description.length >= 300 && (
                <span className="ms-2">Karakter sınırına ulaşıldı.</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
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
              max={2000000}
              required
              style={{
                borderRadius: 12,
                minHeight: 44,
                borderColor: "#d9e4f5",
              }}
            />

            <div className="text-muted small mt-1">Maks: 2.000.000 km</div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
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
              max={10000000}
              required
              style={{
                borderRadius: 12,
                minHeight: 44,
                borderColor: "#d9e4f5",
              }}
            />

            <div className="text-muted small mt-1">Maks: ₺10.000.000</div>
          </div>

          <div className="col-12 col-md-8 col-lg-4">
            <label className="form-label small fw-semibold text-muted">
              Bakım Tarihi
            </label>

            <input
              type="datetime-local"
              className="form-control shadow-none"
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e.target.value)}
              required
              style={{
                borderRadius: 12,
                minHeight: 44,
                borderColor: "#d9e4f5",
              }}
            />
          </div>

          <div className="col-12 col-md-4 col-lg-2 d-flex align-items-end">
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
              <i className="bi bi-plus-circle me-2" />
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMaintenanceForm;
