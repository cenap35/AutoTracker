import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getVehicleNotes,
  createVehicleNote,
  updateVehicleNote,
  deleteVehicleNote,
} from "../services/vehicleNoteService";
import VehicleNoteForm from "../components/VehicleNoteForm";
import VehicleNoteCard from "../components/VehicleNoteCard";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

function ReportsPage() {
  const [vehicles, setVehicles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const vehiclesData = await getVehicles();
        const notesData = await getVehicleNotes();

        setVehicles(vehiclesData);
        setNotes(notesData);
      } catch (err) {
        setError("Araç notları yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createVehicleNote(noteData);

      setNotes([newNote, ...notes]);
      setError("");
      toast.success("Not başarıyla eklendi.");
    } catch (err) {
      toast.error("Not eklenemedi.");
      setError("Not eklenemedi.");
      console.error(err);
    }
  };

  const handleToggleCompleted = async (note) => {
    try {
      const updatedData = {
        title: note.title,
        content: note.content,
        priority: note.priority,
        isCompleted: !note.isCompleted,
      };

      await updateVehicleNote(note.id, updatedData);

      setNotes(
        notes.map((item) =>
          item.id === note.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );

      setError("");
      toast.success(
        note.isCompleted
          ? "Not tekrar bekleyen olarak işaretlendi."
          : "Not tamamlandı.",
      );
    } catch (err) {
      toast.error("Not güncellenemedi.");
      setError("Not güncellenemedi.");
      console.error(err);
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      await updateVehicleNote(noteId, updatedData);

      setNotes(
        notes.map((note) =>
          note.id === noteId ? { ...note, ...updatedData } : note,
        ),
      );

      setError("");
      toast.success("Not başarıyla güncellendi.");
    } catch (err) {
      toast.error("Not güncellenemedi.");
      setError("Not güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteVehicleNote(noteId);

      setNotes(notes.filter((note) => note.id !== noteId));
      setError("");
      toast.success("Not başarıyla silindi.");
    } catch (err) {
      toast.error("Not silinemedi.");
      setError("Not silinemedi.");
      console.error(err);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const vehicleMatch =
      selectedVehicleId === "all" ||
      note.vehicleId === Number(selectedVehicleId);

    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && note.isCompleted) ||
      (selectedStatus === "pending" && !note.isCompleted);

    const priorityMatch =
      selectedPriority === "all" || note.priority === selectedPriority;

    return vehicleMatch && statusMatch && priorityMatch;
  });

  const totalNotes = notes.length;
  const completedNotes = notes.filter((n) => n.isCompleted).length;
  const pendingNotes = totalNotes - completedNotes;
  const highPriorityNotes = notes.filter((n) => n.priority === "Yüksek").length;

  const handleResetFilters = () => {
    setSelectedVehicleId("all");
    setSelectedStatus("all");
    setSelectedPriority("all");
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Raporlar yükleniyor..." />
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
              Raporlama
            </motion.p>

            <motion.h1
              className="h2 fw-bold mb-2"
              style={{ color: "#284185" }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <i
                className="bi bi-clipboard-check me-2"
                style={{ color: "#3b60c5" }}
              />
              Raporlar
            </motion.h1>

            <motion.p
              className="mb-0"
              style={{ color: "#4a5b75", maxWidth: 620, lineHeight: 1.55 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
            >
              Araç notlarınızı, yapılacak işleri ve öncelikli kayıtları tek
              ekrandan takip edin.
            </motion.p>
          </motion.div>

          <div className="col-lg-4 text-lg-end">
            <span className="badge bg-primary-subtle text-primary px-3 py-2">
              {filteredNotes.length} / {totalNotes} not gösteriliyor
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
                    className="bi bi-collection"
                    style={{ color: "#3b60c5" }}
                  />
                </div>
                <div className="h4 fw-bold mb-0" style={{ color: "#284185" }}>
                  {totalNotes}
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
                  {pendingNotes}
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
                  {completedNotes}
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
                  <span className="text-muted small">Yüksek öncelik</span>
                  <i className="bi bi-flag-fill" style={{ color: "#ef4444" }} />
                </div>
                <div className="h4 fw-bold mb-0" style={{ color: "#dc3545" }}>
                  {highPriorityNotes}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: 16 }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-funnel" style={{ color: "#3b60c5" }} />
                <span className="fw-bold" style={{ color: "#284185" }}>
                  Filtreler
                </span>
                <span className="text-muted small">
                  Sonuç: {filteredNotes.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-sm btn-outline-secondary rounded-3"
              >
                <i className="bi bi-arrow-counterclockwise me-1" />
                Temizle
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-5">
                <label className="form-label mb-1 text-muted small">Araç</label>
                <select
                  className="form-select shadow-none"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                >
                  <option value="all">Tüm araçlar</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} - {v.plateNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6 col-md-3">
                <label className="form-label mb-1 text-muted small">
                  Durum
                </label>
                <select
                  className="form-select shadow-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                >
                  <option value="all">Tümü</option>
                  <option value="pending">Bekleyen</option>
                  <option value="completed">Tamamlanan</option>
                </select>
              </div>

              <div className="col-6 col-md-3">
                <label className="form-label mb-1 text-muted small">
                  Öncelik
                </label>
                <select
                  className="form-select shadow-none"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  style={{ borderRadius: 12, borderColor: "#d9e4f5" }}
                >
                  <option value="all">Tümü</option>
                  <option value="Düşük">Düşük</option>
                  <option value="Orta">Orta</option>
                  <option value="Yüksek">Yüksek</option>
                </select>
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

        {/* Araç Notları */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: 16 }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-3">
              <h5
                className="mb-0 fw-bold d-flex align-items-center gap-2"
                style={{ color: "#284185" }}
              >
                <i
                  className="bi bi-clipboard-check"
                  style={{ color: "#3b60c5" }}
                />
                Araç Notları
                <span className="badge bg-primary-subtle text-primary ms-1">
                  {filteredNotes.length}
                </span>
              </h5>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-3"
                onClick={() => setIsCreateOpen((v) => !v)}
                aria-expanded={isCreateOpen}
                aria-controls="report-create-note"
              >
                <i
                  className={`bi ${
                    isCreateOpen ? "bi-chevron-up" : "bi-plus-circle"
                  } me-1`}
                />
                {isCreateOpen ? "Formu Kapat" : "Not Ekle"}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isCreateOpen && (
                <motion.div
                  id="report-create-note"
                  key="create-note"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.2, 0.7, 0.5, 1],
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="rounded-4 border p-3 mb-3"
                    style={{ borderColor: "#e3eafb", background: "#f8fbff" }}
                  >
                    <VehicleNoteForm
                      vehicles={vehicles}
                      selectedVehicleId={
                        selectedVehicleId === "all"
                          ? undefined
                          : selectedVehicleId
                      }
                      onCreate={handleCreateNote}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {filteredNotes.length === 0 ? (
              <div className="alert alert-info text-center rounded-3 mb-0">
                <i className="bi bi-inbox me-2" />
                Bu filtreye uygun not bulunmuyor.
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {filteredNotes.map((note) => {
                  const vehicle = vehicles.find((v) => v.id === note.vehicleId);

                  return (
                    <VehicleNoteCard
                      key={note.id}
                      note={note}
                      vehicle={vehicle}
                      onUpdate={handleUpdateNote}
                      onToggleComplete={handleToggleCompleted}
                      onDelete={handleDeleteNote}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReportsPage;
