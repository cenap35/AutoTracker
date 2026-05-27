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

function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchAllMaintenanceRecords = async () => {
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
    } catch (err) {
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

  return (
    <PageWrapper>
      <div
        className="container py-5"
        style={{
          minHeight: "calc(100vh - 90px)",
          background: "#f8fbff",
          borderRadius: 26,
          boxShadow: "0 4px 42px -14px #3b60c533",
        }}
      >
      
        {/* Başlık ve Açıklama */}
        <div className="mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div>
              <h1
                className="fw-bold mb-2"
                style={{
                  color: "#294686",
                  fontSize: 34,
                  letterSpacing: "1px",
                  textShadow: "1px 2px 12px #e0e7ff",
                }}
              >
                <i
                  className="bi bi-tools me-2"
                  style={{
                    color: "#3b60c5",
                    fontSize: 28,
                    textShadow: "2px 4px 12px #e6edff77",
                  }}
                ></i>
                Bakımlar
              </h1>
              <p
                style={{
                  color: "#546e8c",
                  fontSize: 16,
                  opacity: 0.9,
                  fontWeight: 500,
                  marginBottom: 0,
                }}
              >
                Araçlarınızın bakım kayıtlarını kolayca inceleyin.
              </p>
            </div>
          </div>
        </div>
        <AddMaintenanceForm
          vehicles={vehicles}
          showVehicleSelect={true}
          onCreate={handleCreateMaintenance}
        />
        {/* Filtreleme ve İstatistik Yan Yana */}
        <div className="row mb-4 g-3">
          {/* Filtreleme Card'ı */}
          <div className="col-12 col-md-5 col-lg-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderRadius: 14,
                background: "#fafdff",
                border: "1px solid #e2eaf9",
                boxShadow: "0 1px 7px -2px #3b60c520",
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="fw-bold mb-3 text-primary"
                  style={{ fontSize: 18, letterSpacing: "1px" }}
                >
                  <i className="bi bi-funnel me-2"></i>
                  Filtrele
                </h5>
                <div className="d-flex flex-column gap-2">
                  <select
                    className="form-select form-select-sm shadow-none"
                    style={{
                      minWidth: 140,
                      borderRadius: 8,
                      borderColor: "#bfd5f7",
                      fontWeight: 500,
                      background: "#fff",
                    }}
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    aria-label="Araç filtrele"
                  >
                    <option value="all" style={{ fontWeight: 600 }}>
                      🚗 Tüm araçlar
                    </option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Bakım ara..."
                    style={{
                      minWidth: 120,
                      borderRadius: 8,
                      borderColor: "#bfd5f7",
                      fontWeight: 500,
                      background: "#fff",
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Bakım arama"
                  />
                  <select
                    className="form-select form-select-sm"
                    style={{
                      minWidth: 120,
                      borderRadius: 8,
                      borderColor: "#bfd5f7",
                      fontWeight: 500,
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
          {/* İstatistik Kartları */}
          <div className="col-12 col-md-7 col-lg-8 d-flex gap-3 align-items-stretch flex-wrap">
            <div
              className="text-center flex-fill"
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 7px -4px #3b60c528",
                padding: "20px 24px",
                minWidth: 110,
              }}
            >
              <div className="text-muted mb-1" style={{ fontSize: 13 }}>
                Gösterilen Kayıt
              </div>
              <div className="h5 mb-0 fw-bold">{filteredRecords.length}</div>
            </div>
            <div
              className="text-center flex-fill"
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 7px -4px #3b60c528",
                padding: "20px 24px",
                minWidth: 110,
              }}
            >
              <div className="text-muted mb-1" style={{ fontSize: 13 }}>
                Toplam Masraf
              </div>
              <div className="h5 mb-0 fw-bold">
                ₺{totalFilteredCost.toLocaleString("tr-TR")}
              </div>
            </div>
            <div
              className="text-center flex-fill"
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 7px -4px #3b60c528",
                padding: "20px 24px",
                minWidth: 110,
              }}
            >
              <div className="text-muted mb-1" style={{ fontSize: 13 }}>
                Ortalama Masraf
              </div>
              <div className="h5 mb-0 fw-bold">
                ₺
                {averageFilteredCost.toLocaleString("tr-TR", {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Hata veya Bilgi Mesajı */}
        {error && (
          <div
            className="alert alert-danger text-center"
            style={{ borderRadius: 11 }}
          >
            {error}
          </div>
        )}

        {filteredRecords.length === 0 ? (
          <div
            className="alert alert-info shadow-sm mt-4 text-center"
            style={{
              borderRadius: 14,
              background: "#f6fbff",
              color: "#265",
              fontWeight: 500,
              fontSize: 17,
              letterSpacing: ".2px",
            }}
          >
            <i className="bi bi-emoji-frown me-2"></i>
            Henüz bakım kaydı bulunmuyor.
          </div>
        ) : (
          <div className="row g-4">
            {filteredRecords.map((record) => (
              <div className="col-md-6 col-lg-4" key={record.id}>
                <MaintenanceCard
                  record={record}
                  showVehicleInfo={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default MaintenancePage;
