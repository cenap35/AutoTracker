import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById, updateVehicle } from "../services/vehicleService";
import PageWrapper from "../components/PageWrapper";
import vehicleData from "../constants/vehicleData";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
  deleteMaintenanceRecord,
} from "../services/maintenanceService";

function VehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setPlateNumber(data.plateNumber);
        setCurrentMileage(data.currentMileage);
        const records = await getMaintenanceRecords(id);
        setMaintenanceRecords(records);
      } catch (err) {
        setError("Araç detayı yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleCreateMaintenanceRecord = async (e) => {
    e.preventDefault();

    try {
      const newRecord = await createMaintenanceRecord(id, {
        title,
        description,
        mileage: Number(mileage),
        cost: Number(cost),
        maintenanceDate: new Date(maintenanceDate).toISOString(),
      });

      setMaintenanceRecords([...maintenanceRecords, newRecord]);

      setTitle("");
      setDescription("");
      setMileage("");
      setCost("");
      setMaintenanceDate("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMaintenanceRecord = async (recordId) => {
    try {
      await deleteMaintenanceRecord(id, recordId);

      setMaintenanceRecords(
        maintenanceRecords.filter((record) => record.id !== recordId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();

    try {
      await updateVehicle(id, {
        brand,
        model,
        year: Number(year),
        plateNumber,
        currentMileage: Number(currentMileage),
      });

      const updatedVehicle = await getVehicleById(id);
      setVehicle(updatedVehicle);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper>
      <div
        className="container py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(115deg, #e8f0fe 70%, #e0e5ff 100%)",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div
              className="card shadow-lg border-0 mb-4"
              style={{ borderRadius: 18 }}
            >
              <div className="card-body d-flex flex-column flex-md-row align-items-center">
                <div>
                  <h1
                    className="fw-bold display-5 text-primary mb-2"
                    style={{ letterSpacing: "1px" }}
                  >
                    <i className="bi bi-car-front-fill me-2"></i>
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <div className="mb-3">
                    <span
                      className="badge bg-primary me-2"
                      style={{ fontSize: 17 }}
                    >
                      {vehicle.plateNumber}
                    </span>
                    <span
                      className="badge bg-light text-dark border me-2"
                      style={{ fontSize: 15 }}
                    >
                      Yıl: {vehicle.year}
                    </span>
                    <span
                      className="badge bg-light text-dark border"
                      style={{ fontSize: 15 }}
                    >
                      Km: {vehicle.currentMileage?.toLocaleString("tr-TR") || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Araç Güncelleme Formu */}
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ borderRadius: 14 }}
            >
              <div className="card-body">
                <h3 className="mb-3 text-secondary">
                  <i className="bi bi-pencil-square me-2"></i>
                  Araç Bilgisini Güncelle
                </h3>
                <form className="row g-3 mb-2" onSubmit={handleUpdateVehicle}>
                  <div className="col-md-4">
                    <select
                      className="form-select mb-3"
                      value={brand}
                      required
                      onChange={(e) => {
                        setBrand(e.target.value);
                        setModel("");
                      }}
                    >
                      <option value="">Marka Seç</option>

                      {Object.keys(vehicleData).map((brandName) => (
                        <option key={brandName} value={brandName}>
                          {brandName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select mb-3"
                      value={model}
                      required
                      onChange={(e) => setModel(e.target.value)}
                      disabled={!brand}
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
                  <div className="col-md-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Yıl"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      className="form-control"
                      placeholder="Plaka"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Güncel Km"
                      value={currentMileage}
                      onChange={(e) => setCurrentMileage(e.target.value)}
                      min={0}
                      required
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <button
                      type="submit"
                      className="btn btn-success fw-bold ms-md-auto"
                    >
                      <i className="bi bi-save me-1"></i>Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bakım Kaydı Ekleme */}
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ borderRadius: 14 }}
            >
              <div className="card-body">
                <h3 className="mb-3 text-info">
                  <i className="bi bi-wrench-adjustable me-2"></i>
                  Yeni Bakım Kaydı Ekle
                </h3>
                <form
                  className="row g-3"
                  onSubmit={handleCreateMaintenanceRecord}
                >
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
                    <button
                      type="submit"
                      className="btn btn-info w-100 fw-bold"
                    >
                      <i className="bi bi-plus-circle me-1"></i>Ekle
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bakım Kayıtları */}
            <div className="card shadow border-0" style={{ borderRadius: 16 }}>
              <div className="card-body">
                <h2
                  className="text-primary mb-4"
                  style={{ fontWeight: 700, letterSpacing: ".5px" }}
                >
                  <i className="bi bi-tools me-2"></i>Bakım Kayıtları
                </h2>
                {maintenanceRecords.length === 0 && (
                  <div className="alert alert-info shadow-sm text-center">
                    Henüz bakım kaydı yok.
                  </div>
                )}
                <div className="row g-4">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="col-md-6 col-lg-4">
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{ borderRadius: 13, background: "#f7faff" }}
                      >
                        <div className="card-body pb-3">
                          <div className="d-flex align-items-center mb-1">
                            <h5 className="card-title fw-bold text-info mb-0">
                              <i className="bi bi-clipboard-check me-2"></i>
                              {record.title}
                            </h5>
                          </div>
                          <div
                            className="text-muted mb-2"
                            style={{ fontSize: 14 }}
                          >
                            {record.description}
                          </div>
                          <ul
                            className="list-unstyled mb-2"
                            style={{ fontSize: 15 }}
                          >
                            <li className="mb-1">
                              <i className="bi bi-speedometer2 me-2"></i>Km:{" "}
                              {record.mileage?.toLocaleString("tr-TR")}
                            </li>
                            <li className="mb-1">
                              <i className="bi bi-currency-exchange me-2"></i>
                              Maliyet: {record.cost?.toLocaleString("tr-TR")} ₺
                            </li>
                            <li>
                              <i className="bi bi-calendar3 me-2"></i>
                              {new Date(record.maintenanceDate).toLocaleString(
                                "tr-TR",
                                { dateStyle: "medium", timeStyle: "short" },
                              )}
                            </li>
                          </ul>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            style={{ borderRadius: 6, fontWeight: 500 }}
                            onClick={() =>
                              handleDeleteMaintenanceRecord(record.id)
                            }
                          >
                            <i className="bi bi-trash me-1"></i>Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehicleDetailPage;
