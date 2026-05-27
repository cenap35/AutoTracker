import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  getVehicles,
  deleteVehicle,
  createVehicle,
} from "../services/vehicleService";
import { Link } from "react-router-dom";
import AddVehicleForm from "../components/AddVehicleForm";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateVehicle = async (vehicleFormData) => {
    try {
      const newVehicle = await createVehicle(vehicleFormData);
      setVehicles([...vehicles, newVehicle]);
      setError("");
    } catch (err) {
      setError("Araç eklenemedi.");
      console.error(err);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText = `
      ${vehicle.brand}
      ${vehicle.model}
      ${vehicle.plateNumber}
      ${vehicle.year}
    `.toLowerCase();

    return searchText.includes(searchTerm.toLowerCase());
  });

  return (
    <PageWrapper>
      {/* Dropdawn AddFormVehicle */}
      <div className="dropdown m-2">
        <button
          className="btn btn-primary dropdown-toggle px-4 fw-bold"
          type="button"
          id="addVehicleDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ borderRadius: 6 }}
        >
          <i className="bi bi-plus-circle me-2"></i>Yeni Araç Ekle
        </button>
        <ul
          className="dropdown-menu p-0"
          aria-labelledby="addVehicleDropdown"
          style={{ minWidth: 400, borderRadius: 12 }}
        >
          <li className="p-3" style={{ minWidth: 340, background: "#f4f7fe" }}>
            <AddVehicleForm
              onVehicleCreated={handleCreateVehicle}
              error={error}
            />
          </li>
        </ul>
      </div>

      {/*---- */}
      <div
        className="container py-5"
        style={{ minHeight: "calc(100vh - 90px)" }}
      >
        <div className="row justify-content-center mb-4">
          <div className="col-md-9 col-lg-7 text-center mb-2">
            <h1
              className="fw-bold display-5"
              style={{ color: "#314286", letterSpacing: "1px" }}
            >
              <i
                className="bi bi-car-front-fill me-2"
                style={{ color: "#3b60c5" }}
              ></i>
              Araçlarım
            </h1>
            <p className="lead" style={{ color: "#456" }}>
              Araçlarınızı görüntüleyin, detaylarını inceleyin ve yönetin.
            </p>
          </div>
          {/*arac ara*/}
          <div>
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Marka, model veya plaka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: 14 }}
                />
              </div>
              <div className="justify-content-center mt-5">
                {vehicles.length > 0 && filteredVehicles.length === 0 && (
                  <div className="alert alert-warning text-center shadow-sm">
                    Aramanıza uygun araç bulunamadı.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {vehicles.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info text-center shadow-sm">
                Henüz bir aracınız yok. Kontrol panelinden yeni araç
                ekleyebilirsiniz.
              </div>
            </div>
          )}
          {filteredVehicles.map((vehicle) => (
            <div className="col-md-6 col-lg-4" key={vehicle.id}>
              <Link
                to={`/vehicles/${vehicle.id}`}
                className="text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card h-100 border-0 shadow-sm vehicle-card position-relative"
                  style={{
                    borderRadius: 16,
                    transition:
                      "transform 0.19s cubic-bezier(.29, 1.53, .62, 1), box-shadow 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-7px) scale(1.025)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px -8px #3b60c599";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="card-body pb-3">
                    <div className="mb-2 d-flex justify-content-between align-items-center">
                      <span
                        className="badge bg-primary"
                        style={{ fontSize: 15 }}
                      >
                        {vehicle.plateNumber}
                      </span>
                      <span
                        className="badge bg-light text-dark border"
                        style={{ fontSize: 13 }}
                      >
                        {vehicle.year}
                      </span>
                    </div>
                    <h5
                      className="card-title fw-bold mb-1"
                      style={{ color: "#345" }}
                    >
                      <i
                        className="bi bi-car-front-fill me-2"
                        style={{ color: "#546adc" }}
                      ></i>
                      {vehicle.brand} {vehicle.model}
                    </h5>
                    <div className="mb-2 small text-muted">
                      <i className="bi bi-speedometer2 me-1"></i>
                      {vehicle.currentMileage?.toLocaleString("tr-TR") || 0} km
                    </div>
                    <div className="d-flex mt-3 gap-2">
                      <button
                        className="btn btn-sm btn-outline-danger px-3"
                        style={{ borderRadius: 5 }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteVehicle(vehicle.id);
                        }}
                      >
                        <i className="bi bi-trash me-1"></i> Sil
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehiclesPage;
