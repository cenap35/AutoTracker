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
import { motion, AnimatePresence } from "framer-motion";

function ReminderPage() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
      setIsCreateOpen(false);
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

  const totalReminders = reminders.length;
  const completedReminders = reminders.filter((r) => r.isCompleted).length;
  const pendingReminders = totalReminders - completedReminders;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueReminders = reminders.filter((r) => {
    const dueDate = new Date(r.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return !r.isCompleted && dueDate < today;
  }).length;

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
                Araç takipleri
              </motion.p>

              <motion.h1
                className="h2 fw-bold mb-2"
                style={{ color: "#284185" }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
              >
                <i
                  className="bi bi-calendar-check me-2"
                  style={{ color: "#3b60c5" }}
                />
                Takipler
              </motion.h1>

              <motion.p
                className="mb-0"
                style={{ color: "#4a5b75", maxWidth: 620, lineHeight: 1.55 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28 }}
              >
                Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı takip
                edin.
              </motion.p>
            </motion.div>

            <div className="col-lg-4 text-lg-end">
              <span className="badge bg-primary-subtle text-primary px-3 py-2">
                {filteredReminders.length} / {reminders.length} takip
                gösteriliyor
              </span>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: 16,
                  background:
                    "linear-gradient(110deg, #eaf2ff 60%, #eff5fc 100%)",
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted small">Toplam</span>
                    <i
                      className="bi bi-calendar-check"
                      style={{ color: "#3b60c5" }}
                    />
                  </div>
                  <div className="h4 fw-bold mb-0" style={{ color: "#284185" }}>
                    {totalReminders}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: 16,
                  background:
                    "linear-gradient(110deg, #fff8e8 65%, #ffffff 100%)",
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted small">Bekleyen</span>
                    <i
                      className="bi bi-hourglass-split"
                      style={{ color: "#f59e0b" }}
                    />
                  </div>
                  <div className="h4 fw-bold mb-0" style={{ color: "#8a6514" }}>
                    {pendingReminders}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: 16,
                  background:
                    "linear-gradient(110deg, #eaf9ef 65%, #f8fff9 100%)",
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted small">Tamamlanan</span>
                    <i
                      className="bi bi-check2-circle"
                      style={{ color: "#10b981" }}
                    />
                  </div>
                  <div className="h4 fw-bold mb-0" style={{ color: "#1a906c" }}>
                    {completedReminders}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: 16,
                  background:
                    "linear-gradient(110deg, #fff0f2 65%, #ffffff 100%)",
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted small">Geciken</span>
                    <i
                      className="bi bi-exclamation-triangle-fill"
                      style={{ color: "#ef4444" }}
                    />
                  </div>
                  <div className="h4 fw-bold mb-0" style={{ color: "#dc3545" }}>
                    {overdueReminders}
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

          {/*Takip ekleme formu  */}
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
                    Yeni takip kaydı
                  </h5>

                  <p className="text-muted small mb-0">
                    Sigorta, kasko, MTV ve muayene tarihlerini buradan
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
                  {isCreateOpen ? "Formu Kapat" : "Takip Ekle"}
                </motion.button>
              </div>

              <AnimatePresence>
                {isCreateOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mt-4">
                      <ReminderForm
                        vehicles={vehicles}
                        onCreate={handleCreateReminder}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
