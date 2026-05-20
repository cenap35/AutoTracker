import { useState } from "react";
import vehicleData from "../../constants/vehicleData";

function AddVehicleForm({ onVehicleCreated, error }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onVehicleCreated({
      brand,
      model,
      year: Number(year),
      plateNumber,
      currentMileage: Number(currentMileage),
    });

    setBrand("");
    setModel("");
    setYear("");
    setPlateNumber("");
    setCurrentMileage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm border-0 p-4 mb-3"
      style={{ background: "#f4f7fe", borderRadius: 14 }}
    >
      <h3 className="mb-3 text-primary">
        <i className="bi bi-plus-circle me-2"></i>Yeni Araç Ekle
      </h3>

      <div className="row g-3 mb-2">
        <div className="col-sm-6">
          <select
            className="form-select mb-3"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
            required
          >
            <option value="">Marka Seç</option>

            {Object.keys(vehicleData).map((brandName) => (
              <option key={brandName} value={brandName}>
                {brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-6">
          <select
            className="form-select mb-3"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            required
          >
            <option value="">Model Seç</option>

            {brand &&
              vehicleData[brand].map((modelName) => (
                <option key={modelName} value={modelName}>
                  {modelName}
                </option>
              ))}
          </select>
        </div>

        <div className="col-sm-4">
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Yıl seç</option>

            {Array.from(
              { length: new Date().getFullYear() - 1980 + 2 },
              (_, index) => new Date().getFullYear() + 1 - index
            ).map((yearValue) => (
              <option key={yearValue} value={yearValue}>
                {yearValue}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-4">
          <input
            className="form-control"
            placeholder="Plaka"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            required
          />
        </div>

        <div className="col-sm-4">
          <input
            type="number"
            className="form-control"
            placeholder="KM"
            value={currentMileage}
            onChange={(e) => setCurrentMileage(e.target.value)}
            min="0"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary px-4 fw-bold mt-2"
        style={{ borderRadius: 6 }}
      >
        <i className="bi bi-plus-lg me-1"></i> Ekle
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  );
}

export default AddVehicleForm;