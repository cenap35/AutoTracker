import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById, updateVehicle } from "../services/vehicleService";
import PageWrapper from "../components/PageWrapper";
import vehicleData from "../constants/vehicleData";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} from "../services/maintenanceService";
import AddMaintenanceForm from "../components/AddMaintenanceForm";
import MaintenanceCard from "../components/MaintenanceCard";
import {
  getVehicleNotes,
  createVehicleNote,
  updateVehicleNote,
  deleteVehicleNote,
} from "../services/vehicleNoteService";
import VehicleNotesSection from "../components/VehicleNotesSection";

function VehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  const [vehicleNotes, setVehicleNotes] = useState([]);

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
        const notes = await getVehicleNotes();
        const filteredNotes = notes.filter(
          (note) => note.vehicleId === Number(id),
        );
        setVehicleNotes(filteredNotes);
      } catch (err) {
        setError("Araç detayı yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleToggleVehicleNote = async (note) => {
    try {
      await updateVehicleNote(note.id, {
        title: note.title,
        content: note.content,
        priority: note.priority,
        isCompleted: !note.isCompleted,
      });

      setVehicleNotes(
        vehicleNotes.map((item) =>
          item.id === note.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleCreateVehicleNote = async (noteData) => {
    try {
      const newNote = await createVehicleNote(noteData);

      setVehicleNotes([...vehicleNotes, newNote]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVehicleNote = async (noteId) => {
    try {
      await deleteVehicleNote(noteId);

      setVehicleNotes(vehicleNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVehicleNote = async (noteId, updatedData) => {
    try {
      await updateVehicleNote(noteId, updatedData);

      setVehicleNotes(
        vehicleNotes.map((note) =>
          note.id === noteId ? { ...note, ...updatedData } : note,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateMaintenanceRecord = async (recordData) => {
    try {
      const newRecord = await createMaintenanceRecord(id, recordData);

      setMaintenanceRecords([...maintenanceRecords, newRecord]);
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

  const handleUpdateMaintenanceRecord = async (recordId, recordData) => {
    try {
      await updateMaintenanceRecord(id, recordId, recordData);

      setMaintenanceRecords(
        maintenanceRecords.map((record) =>
          record.id === recordId ? { ...record, ...recordData } : record,
        ),
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

  const totalMaintenanceCost = maintenanceRecords.reduce(
    (sum, record) => sum + Number(record.cost || 0),
    0,
  );

  const averageMaintenanceCost =
    maintenanceRecords.length > 0
      ? totalMaintenanceCost / maintenanceRecords.length
      : 0;

  const latestMaintenanceDate =
    maintenanceRecords.length > 0
      ? maintenanceRecords
          .map((record) => new Date(record.maintenanceDate))
          .sort((a, b) => b - a)[0]
      : null;

  return (
    <PageWrapper>
      <div
        className="py-4"
        style={{
          minHeight: "100vh",
          background: "#f4f7fa",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            {/* Araç Bilgisi */}
            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: 18,
                background: "#fff",
              }}
            >
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center py-3 px-4">
                <div>
                  <h2
                    className="fw-semibold mb-2"
                    style={{ letterSpacing: ".5px", color: "#2563eb" }}
                  >
                    <i className="bi bi-car-front-fill me-2"></i>
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <div className="mb-2">
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

            {/*İstatistik */}
            <div>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{ borderRadius: 14 }}
                  >
                    <div className="card-body text-center">
                      <div className="text-muted small">Bakım Kaydı</div>
                      <div className="h4 fw-bold mb-0">
                        {maintenanceRecords.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{ borderRadius: 14 }}
                  >
                    <div className="card-body text-center">
                      <div className="text-muted small">Toplam Masraf</div>
                      <div className="h4 fw-bold mb-0">
                        ₺{totalMaintenanceCost.toLocaleString("tr-TR")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{ borderRadius: 14 }}
                  >
                    <div className="card-body text-center">
                      <div className="text-muted small">Ortalama Masraf</div>
                      <div className="h4 fw-bold mb-0">
                        ₺
                        {averageMaintenanceCost.toLocaleString("tr-TR", {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{ borderRadius: 14 }}
                  >
                    <div className="card-body text-center">
                      <div className="text-muted small">Son Bakım</div>
                      <div className="h6 fw-bold mb-0">
                        {latestMaintenanceDate
                          ? latestMaintenanceDate.toLocaleDateString("tr-TR")
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Araç Güncelleme Formu */}
            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: 14,
                background: "#fff",
              }}
            >
              <div className="card-body p-4">
                <h5 className="mb-3 text-secondary fw-normal">
                  <i className="bi bi-pencil-square me-2"></i>
                  Araç Bilgisini Güncelle
                </h5>
                <form className="row g-3 mb-1" onSubmit={handleUpdateVehicle}>
                  <div className="col-md-4">
                    <select
                      className="form-select"
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
                      className="form-select"
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
                    <select
                      className="form-select"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    >
                      <option value="">Yıl seç</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1980 + 2 },
                        (_, index) => new Date().getFullYear() + 1 - index,
                      ).map((yearValue) => (
                        <option key={yearValue} value={yearValue}>
                          {yearValue}
                        </option>
                      ))}
                    </select>
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
                  <div className="col-md-8 d-flex align-items-end mt-2 justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-success px-4 fw-bold"
                      style={{ borderRadius: 10 }}
                    >
                      <i className="bi bi-save me-2"></i>Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bakım Kaydı Ekleme - Daha sade: Kendi formunu yukarıda göster, default kartı kaldır */}
            <div className="mb-4">
              <AddMaintenanceForm onCreate={handleCreateMaintenanceRecord} />
            </div>

            {/* Bakım Kayıtları */}
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: 14,
                background: "#fff",
              }}
            >
              <div className="card-body px-4 py-4">
                <h5
                  className="text-primary mb-4 fw-bold"
                  style={{ letterSpacing: ".5px" }}
                >
                  <i className="bi bi-tools me-2"></i>Bakım Kayıtları
                </h5>
                {maintenanceRecords.length === 0 ? (
                  <div className="alert alert-info text-center rounded-3 my-3 py-3 fs-6">
                    Henüz bakım kaydı yok.
                  </div>
                ) : (
                  <div className="row g-3">
                    {[...maintenanceRecords]
                      .sort(
                        (a, b) =>
                          new Date(b.maintenanceDate) -
                          new Date(a.maintenanceDate),
                      )
                      .map((record) => (
                        <div key={record.id} className="col-md-6 col-lg-4">
                          <MaintenanceCard
                            record={record}
                            onUpdate={handleUpdateMaintenanceRecord}
                            onDelete={handleDeleteMaintenanceRecord}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <VehicleNotesSection
              notes={vehicleNotes}
              vehicle={vehicle}
              selectedVehicleId={id}
              onCreate={handleCreateVehicleNote}
              onUpdate={handleUpdateVehicleNote}
              onToggleComplete={handleToggleVehicleNote}
              onDelete={handleDeleteVehicleNote}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehicleDetailPage;
