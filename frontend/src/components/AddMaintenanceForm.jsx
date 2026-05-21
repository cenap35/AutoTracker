import { useState } from "react";

function AddMaintenanceForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      title,
      description,
      mileage: Number(mileage),
      cost: Number(cost),
      maintenanceDate: new Date(maintenanceDate).toISOString(),
    });

    setTitle("");
    setDescription("");
    setMileage("");
    setCost("");
    setMaintenanceDate("");
  };

  return (
    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: 14 }}>
      <div className="card-body">
        <h3 className="mb-3 text-info">
          <i className="bi bi-wrench-adjustable me-2"></i>
          Yeni Bakım Kaydı Ekle
        </h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Km"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              min={0}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Maliyet (₺)"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              min={0}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="datetime-local"
              className="form-control"
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <button type="submit" className="btn btn-info w-100 fw-bold">
              <i className="bi bi-plus-circle me-1"></i>
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMaintenanceForm;