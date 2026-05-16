import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
} from "../services/vehicleService";
import { Link } from 'react-router-dom'

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Araçlar yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicles();
  }, []);

  const handleCreateVehicle = async (e) => {
    e.preventDefault();

    try {
      const newVehicle = await createVehicle({
        brand,
        model,
        year: Number(year),
        plateNumber,
        currentMileage: Number(currentMileage),
      });

      setVehicles([...vehicles, newVehicle]);

      setBrand("");
      setModel("");
      setYear("");
      setPlateNumber("");
      setCurrentMileage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <PageWrapper>
      <div className="container py-5" style={{ minHeight: "calc(100vh - 90px)" }}>
        <div className="row justify-content-center mb-4">
          <div className="col-md-9 col-lg-7 text-center mb-2">
            <h1 className="fw-bold display-5" style={{ color: "#314286", letterSpacing: "1px" }}>
              <i className="bi bi-car-front-fill me-2" style={{ color: "#3b60c5" }}></i>
              Araçlarım
            </h1>
            <p className="lead" style={{ color: "#456" }}>
              Araçlarınızı görüntüleyin, yeni araç ekleyin ve yönetin.
            </p>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-md-8 col-lg-6">
            <form
              onSubmit={handleCreateVehicle}
              className="card shadow-sm border-0 p-4 mb-3"
              style={{ background: "#f4f7fe", borderRadius: 14 }}
            >
              <h3 className="mb-3 text-primary"><i className="bi bi-plus-circle me-2"></i>Yeni Araç Ekle</h3>
              <div className="row g-3 mb-2">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    placeholder="Marka"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-4">
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
              <button type="submit" className="btn btn-primary px-4 fw-bold mt-2" style={{ borderRadius: 6 }}>
                <i className="bi bi-plus-lg me-1"></i> Ekle
              </button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>

        <div className="row g-4">
          {vehicles.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info text-center shadow-sm">
                Henüz bir araç eklenmemiş. Hemen bir araç ekleyin!
              </div>
            </div>
          )}
          {vehicles.map((vehicle) => (
            <div className="col-md-6 col-lg-4" key={vehicle.id}>
              <div className="card h-100 border-0 shadow-sm vehicle-card position-relative" style={{ borderRadius: 16 }}>
                <div className="card-body pb-3">
                  <div className="mb-2 d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary" style={{ fontSize: 15 }}>
                      {vehicle.plateNumber}
                    </span>
                    <span className="badge bg-light text-dark border" style={{ fontSize: 13 }}>
                      {vehicle.year}
                    </span>
                  </div>
                  <h5 className="card-title fw-bold mb-1" style={{ color: "#345" }}>
                    <i className="bi bi-car-front-fill me-2" style={{ color: "#546adc" }}></i>
                    {vehicle.brand} {vehicle.model}
                  </h5>
                  <div className="mb-2 small text-muted">
                    <i className="bi bi-speedometer2 me-1"></i>
                    {vehicle.currentMileage?.toLocaleString("tr-TR") || 0} km
                  </div>
                  <div className="d-flex mt-3 gap-2">
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="btn btn-sm btn-outline-primary fw-bold px-3"
                      style={{ borderRadius: 5 }}
                    >
                      <i className="bi bi-info-circle me-1"></i> Detaylar
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger px-3"
                      style={{ borderRadius: 5 }}
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehiclesPage;
