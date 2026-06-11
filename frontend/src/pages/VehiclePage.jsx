import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  getVehicles,
  deleteVehicle,
  createVehicle,
} from "../services/vehicleService";
import { Link } from "react-router-dom";
import AddVehicleForm from "../components/AddVehicleForm";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmVehicleId, setDeleteConfirmVehicleId] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);

      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Araçlar yüklenemedi");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

      toast.success("Araç başarıyla silindi.");
    } catch (err) {
      toast.error("Araç silinemedi.");
      console.error(err);
    }
  };

  const handleCreateVehicle = async (vehicleFormData) => {
    try {
      const newVehicle = await createVehicle(vehicleFormData);
      setVehicles([...vehicles, newVehicle]);
      toast.success("Araç başarıyla eklendi.");
      setError("");
    } catch (err) {
      toast.error("Araç eklenemedi.");
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

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Araçlar yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container py-4 py-lg-5">
        <div className="row mb-4 align-items-center g-3">
          <motion.div
            className="col-lg-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.p
              className="small text-uppercase fw-semibold mb-1"
              style={{ color: "#3b60c5", letterSpacing: "1px" }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              Araç yönetimi
            </motion.p>

            <motion.h1
              className="h2 fw-bold mb-2"
              style={{ color: "#284185" }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <i
                className="bi bi-car-front-fill me-2"
                style={{ color: "#3b60c5" }}
              />
              Araçlarım
            </motion.h1>

            <motion.p
              className="mb-0"
              style={{ color: "#4a5b75", maxWidth: 560, lineHeight: 1.55 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
            >
              Araçlarınızı görüntüleyin, detaylarını inceleyin ve yönetin.
            </motion.p>
          </motion.div>

          <div className="col-lg-4 d-flex justify-content-lg-end">
            <button
              type="button"
              className="btn btn-primary px-4 fw-bold"
              onClick={() => setIsCreateOpen(!isCreateOpen)}
              style={{ borderRadius: 12 }}
            >
              <i
                className={`bi ${
                  isCreateOpen ? "bi-chevron-up" : "bi-plus-circle"
                } me-2`}
              />
              {isCreateOpen ? "Formu Kapat" : "Yeni Araç Ekle"}
            </button>
          </div>
        </div>

        {/*animasyonlu form açılışı */}
        <div
          style={{
            overflow: "hidden",
            transition:
              "max-height 0.55s cubic-bezier(.36,1.6,.56,1), opacity 0.4s, transform 0.44s",
            maxHeight: isCreateOpen ? 900 : 0,
            opacity: isCreateOpen ? 1 : 0,
            transform: isCreateOpen ? "translateY(0)" : "translateY(-32px)",
            marginBottom: isCreateOpen ? 24 : 0,
          }}
        >
          {isCreateOpen && (
            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.97)",
                border: "1.3px solid #e3eafb",
              }}
            >
              <div className="card-body p-3 p-md-4">
                <AddVehicleForm
                  onVehicleCreated={handleCreateVehicle}
                  error={error}
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: 16 }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="row align-items-center g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-lg shadow-none"
                  placeholder="Marka, model veya plaka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: 14, borderColor: "#d9e4f5" }}
                />
              </div>

              <div className="col-md-4 text-md-end">
                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  {filteredVehicles.length} / {vehicles.length} araç
                </span>
              </div>
            </div>
          </div>
        </div>

        {vehicles.length > 0 && filteredVehicles.length === 0 && (
          <div className="alert alert-warning text-center shadow-sm rounded-3">
            Aramanıza uygun araç bulunamadı.
          </div>
        )}

        {vehicles.length === 0 ? (
          <div className="alert alert-info text-center shadow-sm rounded-3">
            Henüz bir aracınız yok. Kontrol panelinden yeni araç
            ekleyebilirsiniz.
          </div>
        ) : (
          <div className="row g-4">
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
                      background:
                        "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-5px) scale(1.015)";
                      e.currentTarget.style.boxShadow = "0 10px 28px #3b60c522";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <span
                          className="badge fw-semibold"
                          style={{
                            background:
                              "linear-gradient(90deg, #3b60c5, #314286)",
                            color: "#ffe082",
                            fontSize: "0.85rem",
                            padding: "6px 12px",
                            borderRadius: 12,
                          }}
                        >
                          {vehicle.plateNumber}
                        </span>

                        <span className="badge bg-light text-dark border">
                          {vehicle.year}
                        </span>
                      </div>

                      <h5
                        className="card-title fw-bold mb-2"
                        style={{ color: "#274a78" }}
                      >
                        <i
                          className="bi bi-car-front-fill me-2"
                          style={{ color: "#546adc" }}
                        ></i>
                        {vehicle.brand} {vehicle.model}
                      </h5>

                      <div className="mb-3 small text-muted">
                        <i className="bi bi-speedometer2 me-1"></i>
                        {vehicle.currentMileage?.toLocaleString("tr-TR") ||
                          0}{" "}
                        km
                      </div>

                      <div className="d-flex mt-3 gap-2 align-items-center flex-wrap">
                        {deleteConfirmVehicleId !== vehicle.id ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger px-3"
                            style={{ borderRadius: 10 }}
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteConfirmVehicleId(vehicle.id);
                            }}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Sil
                          </button>
                        ) : (
                          <>
                            <span className="small text-danger fw-semibold">
                              Emin misin?
                            </span>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                setDeleteConfirmVehicleId(null);
                              }}
                            >
                              Vazgeç
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger fw-bold"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteVehicle(vehicle.id);
                                setDeleteConfirmVehicleId(null);
                              }}
                            >
                              Sil
                            </button>
                          </>
                        )}

                        <span
                          className="small fw-semibold ms-auto"
                          style={{ color: "#3b60c5" }}
                        >
                          Detaylar
                          <i className="bi bi-arrow-right ms-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default VehiclesPage;
