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
import ReminderForm from "../components/ReminderForm";
import {
  getVehicleReminders,
  createVehicleReminder,
  updateVehicleReminder,
  deleteVehicleReminder,
} from "../services/vehicleReminderService";
import ReminderCard from "../components/ReminderCard";

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

  const [vehicleReminders, setVehicleReminders] = useState([]);

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
        const reminders = await getVehicleReminders();
        const filteredReminders = reminders.filter(
          (reminder) => reminder.vehicleId === Number(id),
        );
        setVehicleReminders(filteredReminders);
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

  const handleCreateVehicleReminder = async (reminderData) => {
    try {
      const newReminder = await createVehicleReminder(reminderData);

      setVehicleReminders([newReminder, ...vehicleReminders]);
      setError("");
    } catch (err) {
      setError("Takip eklenemedi.");
      console.error(err);
    }
  };
  const handleToggleVehicleReminder = async (reminder) => {
    try {
      await updateVehicleReminder(reminder.id, {
        type: reminder.type,
        dueDate: reminder.dueDate,
        amount: reminder.amount,
        description: reminder.description,
        isCompleted: !reminder.isCompleted,
      });

      setVehicleReminders(
        vehicleReminders.map((item) =>
          item.id === reminder.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );
    } catch (err) {
      setError("Takip güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteVehicleReminder = async (id) => {
    try {
      await deleteVehicleReminder(id);

      setVehicleReminders(
        vehicleReminders.filter((reminder) => reminder.id !== id),
      );
    } catch (err) {
      setError("Takip silinemedi.");
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
          background: "#f7fafd",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">

            {/* Araç Bilgisi */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{
                borderRadius: 14,
                background: "#fff",
              }}
            >
              <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center py-3 px-4">
                <div>
                  <h3 className="fw-semibold mb-2" style={{ color: "#2563eb" }}>
                    <i className="bi bi-car-front-fill me-2"></i>
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="mb-2 d-flex flex-wrap gap-2">
                    <span className="badge bg-primary text-white" style={{ fontSize: 16 }}>
                      {vehicle.plateNumber}
                    </span>
                    <span className="badge bg-light text-dark border" style={{ fontSize: 15 }}>
                      Yıl: {vehicle.year}
                    </span>
                    <span className="badge bg-light text-dark border" style={{ fontSize: 15 }}>
                      Km: {vehicle.currentMileage?.toLocaleString("tr-TR") || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="mb-3">
              <div className="row g-2">
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>Bakım Kaydı</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>{maintenanceRecords.length}</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>Toplam Masraf</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      ₺{totalMaintenanceCost.toLocaleString("tr-TR")}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>Ortalama Masraf</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      ₺{averageMaintenanceCost.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>Son Bakım</div>
                    <div className="fw-bold" style={{ fontSize: 18 }}>
                      {latestMaintenanceDate
                        ? latestMaintenanceDate.toLocaleDateString("tr-TR")
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Araç Güncelleme Formu */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <div className="card-body p-4">
                <div className="mb-3 text-secondary fw-normal" style={{ fontSize: 17 }}>
                  <i className="bi bi-pencil-square me-2"></i>
                  Araç Bilgisini Güncelle
                </div>
                <form className="row g-2 mb-1" onSubmit={handleUpdateVehicle}>
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
                      className="btn btn-primary px-4 fw-bold"
                      style={{ borderRadius: 8, fontSize: 16 }}
                    >
                      <i className="bi bi-save me-2"></i>Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Bakım Kaydı Ekleme */}
            <div className="mb-3">
              <AddMaintenanceForm onCreate={handleCreateMaintenanceRecord} />
            </div>

            {/* Bakım Kayıtları */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <div className="card-body px-4 py-3">
                <div className="text-primary mb-3 fw-bold" style={{ fontSize: 18 }}>
                  <i className="bi bi-tools me-2"></i>Bakım Kayıtları
                </div>
                {maintenanceRecords.length === 0 ? (
                  <div className="alert alert-info text-center rounded-3 my-3 py-3 fs-6">
                    Henüz bakım kaydı yok.
                  </div>
                ) : (
                  <div className="row g-2">
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

            {/* Takip Formu */}
            <div className="mb-3">
              <ReminderForm
                selectedVehicleId={id}
                onCreate={handleCreateVehicleReminder}
              />
            </div>

            {/* Araç Takipleri */}
            <div
              className="card border-0 shadow-sm mb-2"
              style={{ borderRadius: 10 }}
            >
              <div className="card-body px-4 py-3">
                <div className="text-primary mb-2 fw-bold" style={{ fontSize: 18 }}>
                  <i className="bi bi-calendar-check me-2"></i>
                  Araç Takipleri
                </div>
                {vehicleReminders.length === 0 ? (
                  <div className="alert alert-info text-center rounded-3">
                    Bu araca ait takip kaydı bulunmuyor.
                  </div>
                ) : (
                  <div className="row g-2">
                    {[...vehicleReminders]
                      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                      .map((reminder) => (
                        <div className="col-md-6 col-lg-4" key={reminder.id}>
                          <ReminderCard
                            reminder={reminder}
                            onToggleComplete={handleToggleVehicleReminder}
                            onDelete={handleDeleteVehicleReminder}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehicleDetailPage;
