import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
} from "../services/maintenanceService";
import AddMaintenanceForm from "../components/AddMaintenanceForm";
import MaintenanceCard from "../components/MaintenanceCard";

import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchAllMaintenanceRecords = async () => {
      setLoading(true);
      try {
        const vehicles = await getVehicles();
        setVehicles(vehicles);

        const allRecords = await Promise.all(
          vehicles.map(async (vehicle) => {
            const maintenanceRecords = await getMaintenanceRecords(vehicle.id);

            return maintenanceRecords.map((record) => ({
              ...record,
              vehicleId: vehicle.id,
              vehicleName: `${vehicle.brand} ${vehicle.model}`,
              plateNumber: vehicle.plateNumber,
            }));
          }),
        );

        setRecords(allRecords.flat());
      } catch (err) {
        setError("Bakım kayıtları yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMaintenanceRecords();
  }, []);

  const handleCreateMaintenance = async (recordData) => {
    try {
      const newRecord = await createMaintenanceRecord(
        recordData.vehicleId,
        recordData,
      );

      const selectedVehicle = vehicles.find(
        (vehicle) => vehicle.id === recordData.vehicleId,
      );

      const recordWithVehicleInfo = {
        ...newRecord,
        vehicleId: recordData.vehicleId,
        vehicleName: selectedVehicle
          ? `${selectedVehicle.brand} ${selectedVehicle.model}`
          : "",
        plateNumber: selectedVehicle?.plateNumber || "",
      };

      setRecords([recordWithVehicleInfo, ...records]);
      setError("");
      setIsCreateOpen(false);
      toast.success("Bakım kaydı başarıyla eklendi.");
    } catch (err) {
      toast.error("Bakım kaydı eklenemedi.");
      setError("Bakım kaydı eklenemedi.");
      console.error(err);
    }
  };

  const filteredRecords = records
    .filter((record) => {
      const matchesVehicle =
        selectedVehicleId === "all" ||
        record.vehicleId === Number(selectedVehicleId);

      const searchText = `
      ${record.title}
      ${record.description}
      ${record.vehicleName}
      ${record.plateNumber}
    `.toLowerCase();

      const matchesSearch = searchText.includes(searchTerm.toLowerCase());

      return matchesVehicle && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.maintenanceDate) - new Date(a.maintenanceDate);

        case "oldest":
          return new Date(a.maintenanceDate) - new Date(b.maintenanceDate);

        case "highestCost":
          return Number(b.cost) - Number(a.cost);

        case "lowestCost":
          return Number(a.cost) - Number(b.cost);

        case "highestMileage":
          return Number(b.mileage) - Number(a.mileage);

        default:
          return 0;
      }
    });

  const totalFilteredCost = filteredRecords.reduce(
    (sum, record) => sum + Number(record.cost || 0),
    0,
  );

  const averageFilteredCost =
    filteredRecords.length > 0 ? totalFilteredCost / filteredRecords.length : 0;

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Bakım kayıtları yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container py-4 py-lg-5">
        {/* Header */}
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
              Bakım yönetimi
            </motion.p>

            <motion.h1
              className="h2 fw-bold mb-2"
              style={{ color: "#284185" }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <i className="bi bi-tools me-2" style={{ color: "#3b60c5" }} />
              Bakımlar
            </motion.h1>

            <motion.p
              className="mb-0"
              style={{ color: "#4a5b75", maxWidth: 560, lineHeight: 1.55 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
            >
              Araçlarınızın bakım kayıtlarını görüntüleyin, filtreleyin ve
              masraf özetlerini takip edin.
            </motion.p>
          </motion.div>
        </div>

        {/* Bakım ekleme formu */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: 16,
            background: "rgba(255,255,255,0.97)",
            border: "1.3px solid #e3eafb",
          }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div>
                <h5 className="fw-bold mb-1" style={{ color: "#284185" }}>
                  <i
                    className="bi bi-plus-circle me-2"
                    style={{ color: "#3b60c5" }}
                  />
                  Yeni bakım kaydı
                </h5>
                <p className="text-muted small mb-0">
                  Yeni bakım, onarım ve masraf bilgisini buradan
                  ekleyebilirsiniz.
                </p>
              </div>

              <motion.button
                type="button"
                className="btn btn-outline-primary fw-semibold"
                onClick={() => setIsCreateOpen((prev) => !prev)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ borderRadius: 12 }}
              >
                <i
                  className={`bi ${
                    isCreateOpen ? "bi-chevron-up" : "bi-plus-circle"
                  } me-2`}
                />
                {isCreateOpen ? "Formu Kapat" : "Bakım Ekle"}
              </motion.button>
            </div>
            <AnimatePresence>
              {isCreateOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="mt-4">
                    <AddMaintenanceForm
                      vehicles={vehicles}
                      showVehicleSelect={true}
                      onCreate={handleCreateMaintenance}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filtreleme ve istatistik */}
        <div className="row mb-4 g-3">
          <div className="col-12 col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.97)",
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="fw-bold mb-3 d-flex align-items-center gap-2"
                  style={{ color: "#284185", fontSize: 18 }}
                >
                  <i className="bi bi-funnel" style={{ color: "#3b60c5" }} />
                  Filtrele
                </h5>

                <div className="d-flex flex-column gap-2">
                  <select
                    className="form-select shadow-none"
                    style={{
                      borderRadius: 12,
                      borderColor: "#d9e4f5",
                      background: "#fff",
                    }}
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    aria-label="Araç filtrele"
                  >
                    <option value="all">Tüm araçlar</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Bakım ara..."
                    style={{
                      borderRadius: 12,
                      borderColor: "#d9e4f5",
                      background: "#fff",
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Bakım arama"
                  />

                  <select
                    className="form-select shadow-none"
                    style={{
                      borderRadius: 12,
                      borderColor: "#d9e4f5",
                      background: "#fff",
                    }}
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    aria-label="Sırala"
                  >
                    <option value="newest">En yeni bakım</option>
                    <option value="oldest">En eski bakım</option>
                    <option value="highestCost">En yüksek masraf</option>
                    <option value="lowestCost">En düşük masraf</option>
                    <option value="highestMileage">En yüksek KM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="row g-3 h-100">
              <div className="col-md-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #eaf2ff 60%, #eff5fc 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="text-muted small">Gösterilen kayıt</div>
                    <div
                      className="h4 fw-bold mb-0"
                      style={{ color: "#284185" }}
                    >
                      {filteredRecords.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #fff5de 67%, #fffdf6 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="text-muted small">Toplam masraf</div>
                    <div
                      className="h4 fw-bold mb-0"
                      style={{ color: "#b78b16" }}
                    >
                      ₺{totalFilteredCost.toLocaleString("tr-TR")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: 16,
                    background:
                      "linear-gradient(110deg, #eaf9ef 65%, #f8fff9 100%)",
                  }}
                >
                  <div className="card-body">
                    <div className="text-muted small">Ortalama masraf</div>
                    <div
                      className="h4 fw-bold mb-0"
                      style={{ color: "#1a906c" }}
                    >
                      ₺
                      {averageFilteredCost.toLocaleString("tr-TR", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger text-center shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        {filteredRecords.length === 0 ? (
          <div className="alert alert-info shadow-sm text-center rounded-3">
            <i className="bi bi-inbox me-2"></i>
            Henüz bakım kaydı bulunmuyor.
          </div>
        ) : (
          <div className="row g-4">
            {filteredRecords.map((record) => (
              <div className="col-md-6 col-lg-4" key={record.id}>
                <MaintenanceCard record={record} showVehicleInfo={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default MaintenancePage;
