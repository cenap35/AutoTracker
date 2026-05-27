import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getVehicleReminders,
  createVehicleReminder,
  updateVehicleReminder,
  deleteVehicleReminder,
} from "../services/vehicleReminderService";
import ReminderForm from "../components/ReminderForm";
import ReminderCard from "../components/ReminderCard";

function ReminderPage() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await getVehicles();
        const remindersData = await getVehicleReminders();

        setVehicles(vehiclesData);
        setReminders(remindersData);
      } catch (err) {
        setError("Takipler yüklenemedi.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCreateReminder = async (reminderData) => {
    try {
      const newReminder = await createVehicleReminder(reminderData);

      setReminders([newReminder, ...reminders]);
      setError("");
    } catch (err) {
      setError("Takip eklenemedi.");
      console.error(err);
    }
  };

  const handleToggleCompleted = async (reminder) => {
    const updatedData = {
      type: reminder.type,
      dueDate: reminder.dueDate,
      amount: reminder.amount,
      description: reminder.description,
      isCompleted: !reminder.isCompleted,
    };

    try {
      await updateVehicleReminder(reminder.id, updatedData);

      setReminders(
        reminders.map((item) =>
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

  const handleDeleteReminder = async (id) => {
    try {
      await deleteVehicleReminder(id);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (err) {
      setError("Takip silinemedi.");
      console.error(err);
    }
  };

  const filteredReminders = reminders.filter((reminder) => {
    const vehicleMatch =
      selectedVehicleId === "all" ||
      reminder.vehicleId === Number(selectedVehicleId);

    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && reminder.isCompleted) ||
      (selectedStatus === "pending" && !reminder.isCompleted);

    const typeMatch = selectedType === "all" || reminder.type === selectedType;

    return vehicleMatch && statusMatch && typeMatch;
  });

  return (
    <PageWrapper>
      <div className="container py-5">
        <h1 className="fw-bold mb-2" style={{ color: "#314286" }}>
          <i className="bi bi-calendar-check me-2"></i>
          Takipler
        </h1>

        <p className="text-muted mb-4">
          Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı takip edin.
          <br />
          <span className="small">
            {filteredReminders.length} / {reminders.length} takip gösteriliyor
          </span>
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        {/*Ekleme formu */}
        <div className="mb-4">
          <ReminderForm vehicles={vehicles} onCreate={handleCreateReminder} />
        </div>

        {/*filtreleme */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: 14 }}
        >
          <div className="card-body">
            <span className="fw-bold" style={{ color: "#3b60c5" }}>
              <i className="bi bi-funnel me-2"></i>
              Filtreler
            </span>

            <div className="row g-2 mt-2">
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                >
                  <option value="all">Tüm Araçlar</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="pending">Bekleyen</option>
                  <option value="completed">Tamamlanan</option>
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">Tüm Türler</option>
                  <option value="Sigorta">Sigorta</option>
                  <option value="Kasko">Kasko</option>
                  <option value="MTV">MTV</option>
                  <option value="Muayene">Muayene</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {filteredReminders.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                Henüz takip kaydı yok.
              </div>
            </div>
          ) : (
            [...filteredReminders]
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((reminder) => (
                <div className="col-md-6 col-lg-4" key={reminder.id}>
                  <ReminderCard
                    reminder={reminder}
                    onToggleComplete={handleToggleCompleted}
                    onDelete={handleDeleteReminder}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReminderPage;
