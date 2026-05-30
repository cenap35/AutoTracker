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
import DashboardBackground from "../components/Dashboard/DashboardBackground";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

function ReminderPage() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const vehiclesData = await getVehicles();
        const remindersData = await getVehicleReminders();

        setVehicles(vehiclesData);
        setReminders(remindersData);
      } catch (err) {
        setError("Takipler yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateReminder = async (reminderData) => {
    try {
      const newReminder = await createVehicleReminder(reminderData);

      setReminders([newReminder, ...reminders]);
      setError("");
      toast.success("Takip başarıyla eklendi.");
    } catch (err) {
      toast.error("Takip eklenemedi.");
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

      setError("");
      toast.success(
        reminder.isCompleted
          ? "Takip tekrar bekleyen olarak işaretlendi."
          : "Takip tamamlandı.",
      );
    } catch (err) {
      toast.error("Takip güncellenemedi.");
      setError("Takip güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteVehicleReminder(id);

      setReminders(reminders.filter((reminder) => reminder.id !== id));
      setError("");
      toast.success("Takip başarıyla silindi.");
    } catch (err) {
      toast.error("Takip silinemedi.");
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

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Takipler yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <DashboardBackground>
        <div className="container py-4 py-lg-5">
          {/* Header */}
          <div className="row mb-4 align-items-center g-3">
            <div className="col-lg-8">
              <p
                className="small text-uppercase fw-semibold mb-1"
                style={{ color: "#3b60c5", letterSpacing: "1px" }}
              >
                Araç takipleri
              </p>

              <h1 className="h2 fw-bold mb-2" style={{ color: "#284185" }}>
                <i
                  className="bi bi-calendar-check me-2"
                  style={{ color: "#3b60c5" }}
                />
                Takipler
              </h1>

              <p
                className="mb-0"
                style={{ color: "#4a5b75", maxWidth: 620, lineHeight: 1.55 }}
              >
                Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı takip
                edin.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <span className="badge bg-primary-subtle text-primary px-3 py-2">
                {filteredReminders.length} / {reminders.length} takip
                gösteriliyor
              </span>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger text-center shadow-sm rounded-3">
              <i className="bi bi-exclamation-triangle me-2" />
              {error}
            </div>
          )}

          {/* Ekleme formu */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-3 p-md-4">
              <ReminderForm
                vehicles={vehicles}
                onCreate={handleCreateReminder}
              />
            </div>
          </div>

          {/* Filtreleme */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-funnel" style={{ color: "#3b60c5" }} />
                <span className="fw-bold" style={{ color: "#284185" }}>
                  Filtreler
                </span>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <select
                    className="form-select shadow-none"
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                  >
                    <option value="all">Tüm araçlar</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select shadow-none"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                  >
                    <option value="all">Tüm durumlar</option>
                    <option value="pending">Bekleyen</option>
                    <option value="completed">Tamamlanan</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select shadow-none"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                  >
                    <option value="all">Tüm türler</option>
                    <option value="Sigorta">Sigorta</option>
                    <option value="Kasko">Kasko</option>
                    <option value="MTV">MTV</option>
                    <option value="Muayene">Muayene</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredReminders.length === 0 ? (
            <div className="alert alert-info text-center shadow-sm rounded-3">
              <i className="bi bi-inbox me-2"></i>
              Henüz takip kaydı yok.
            </div>
          ) : (
            <div className="row g-3">
              {[...filteredReminders]
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((reminder) => (
                  <div className="col-md-6 col-lg-4" key={reminder.id}>
                    <ReminderCard
                      reminder={reminder}
                      onToggleComplete={handleToggleCompleted}
                      onDelete={handleDeleteReminder}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </DashboardBackground>
    </PageWrapper>
  );
}

export default ReminderPage;
