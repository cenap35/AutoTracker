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
import DashboardBackground from "../components/Dashboard/DashboardBackground";
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
      <DashboardBackground>
        <div className="container py-4 py-lg-5">
          <div className="container-fluid px-0">
            {/* Üst başlık */}
            <div
              className="rounded-4 border mb-4 p-3 p-md-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(57,119,245,0.10), rgba(99,102,241,0.06), rgba(16,185,129,0.05))",
                borderColor: "#e9ecef",
              }}
            >
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3 gap-lg-4">
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-4 border"
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(57,119,245,0.10)",
                      borderColor: "rgba(57,119,245,0.20)",
                      flex: "0 0 auto",
                    }}
                  >
                    <i
                      className="bi bi-clipboard-check"
                      style={{ fontSize: 22, color: "#3977f5" }}
                    />
                  </div>

                  <div>
                    <p
                      className="small text-uppercase fw-semibold mb-1"
                      style={{ color: "#3b60c5", letterSpacing: "1px" }}
                    >
                      Araç raporları
                    </p>

                    <h2 className="fw-bold mb-1" style={{ color: "#284185" }}>
                      Raporlar
                    </h2>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="text-muted" style={{ fontSize: 14 }}>
                        Araç notları üzerinden özet ve filtreleme
                      </span>
                      <span
                        className="badge rounded-pill"
                        style={{
                          background: "rgba(57,119,245,0.12)",
                          color: "#245fe0",
                          border: "1px solid rgba(57,119,245,0.18)",
                          fontWeight: 600,
                        }}
                      >
                        {totalNotes} kayıt
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-100 w-lg-auto">
                  <div className="row g-2 g-md-3">
                    <div className="col-6 col-md-3">
                      <div
                        className="rounded-4 border p-3 h-100"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          borderColor: "#e9ecef",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="text-muted" style={{ fontSize: 13 }}>
                            Toplam
                          </span>
                          <i
                            className="bi bi-collection"
                            style={{ color: "#6c757d" }}
                          />
                        </div>
                        <div className="fw-bold mt-1" style={{ fontSize: 20 }}>
                          {totalNotes}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div
                        className="rounded-4 border p-3 h-100"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          borderColor: "#e9ecef",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="text-muted" style={{ fontSize: 13 }}>
                            Bekleyen
                          </span>
                          <i
                            className="bi bi-hourglass-split"
                            style={{ color: "#f59e0b" }}
                          />
                        </div>
                        <div className="fw-bold mt-1" style={{ fontSize: 20 }}>
                          {pendingNotes}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div
                        className="rounded-4 border p-3 h-100"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          borderColor: "#e9ecef",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="text-muted" style={{ fontSize: 13 }}>
                            Tamamlanan
                          </span>
                          <i
                            className="bi bi-check2-circle"
                            style={{ color: "#10b981" }}
                          />
                        </div>
                        <div className="fw-bold mt-1" style={{ fontSize: 20 }}>
                          {completedNotes}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div
                        className="rounded-4 border p-3 h-100"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          borderColor: "#e9ecef",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="text-muted" style={{ fontSize: 13 }}>
                            Yüksek
                          </span>
                          <i
                            className="bi bi-flag-fill"
                            style={{ color: "#ef4444" }}
                          />
                        </div>
                        <div className="fw-bold mt-1" style={{ fontSize: 20 }}>
                          {highPriorityNotes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtre paneli */}
              <div className="mt-3 mt-md-4">
                <div
                  className="rounded-4 border p-3"
                  style={{
                    background: "rgba(255,255,255,0.80)",
                    borderColor: "#e9ecef",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 gap-md-3 mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <i
                        className="bi bi-funnel"
                        style={{ color: "#3977f5" }}
                      />
                      <span className="fw-semibold" style={{ fontSize: 14 }}>
                        Filtreler
                      </span>
                      <span className="text-muted" style={{ fontSize: 13 }}>
                        Sonuç: {filteredNotes.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="btn btn-sm btn-outline-secondary rounded-3"
                      style={{ lineHeight: 1.2 }}
                    >
                      <i className="bi bi-arrow-counterclockwise me-1" />
                      Temizle
                    </button>
                  </div>

                  <div className="row g-2 g-md-3 align-items-center">
                    <div className="col-12 col-md-6 col-lg-5">
                      <label
                        className="form-label mb-1 text-muted"
                        style={{ fontSize: 13 }}
                      >
                        Araç
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        style={{
                          minHeight: 40,
                          borderColor: "#e9ecef",
                          background: "#ffffff",
                        }}
                      >
                        <option value="all">Tüm Araçlar</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.brand} {v.model} - {v.plateNumber}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-3 col-lg-3">
                      <label
                        className="form-label mb-1 text-muted"
                        style={{ fontSize: 13 }}
                      >
                        Durum
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{
                          minHeight: 40,
                          borderColor: "#e9ecef",
                          background: "#ffffff",
                        }}
                      >
                        <option value="all">Tümü</option>
                        <option value="pending">Bekleyen</option>
                        <option value="completed">Tamamlanan</option>
                      </select>
                    </div>

                    <div className="col-6 col-md-3 col-lg-3">
                      <label
                        className="form-label mb-1 text-muted"
                        style={{ fontSize: 13 }}
                      >
                        Öncelik
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        style={{
                          minHeight: 40,
                          borderColor: "#e9ecef",
                          background: "#ffffff",
                        }}
                      >
                        <option value="all">Tümü</option>
                        <option value="Düşük">Düşük</option>
                        <option value="Orta">Orta</option>
                        <option value="Yüksek">Yüksek</option>
                      </select>
                    </div>

                    <div className="col-12 col-lg-1 d-none d-lg-block">
                      <div className="text-end">
                        <span
                          className="badge rounded-pill text-bg-light border"
                          style={{ borderColor: "#e9ecef", fontWeight: 600 }}
                        >
                          <i className="bi bi-sliders me-1" />
                          Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hata */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3 rounded-3 w-100 mx-auto">
                <i className="bi bi-exclamation-triangle-fill"></i>
                {error}
              </div>
            )}

            <div
              className="card border-0 shadow-sm mb-4 mt-4"
              style={{
                borderRadius: 16,

                background: "rgba(255,255,255,0.97)",

                border: "1.3px solid #e3eafb",
              }}
            >
              <div className="card-body px-4 py-4">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-3">
                  <h5 className="text-primary mb-0 fw-bold d-flex align-items-center gap-2">
                    <i className="bi bi-clipboard-check" />
                    Araç Notları
                    <span className="badge rounded-pill text-bg-light border ms-1">
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
                      className={`bi ${isCreateOpen ? "bi-chevron-up" : "bi-chevron-down"} me-1`}
                    />
                    + Not Ekle
                  </button>
                </div>

                <div
                  id="report-create-note"
                  className={isCreateOpen ? "collapse show" : "collapse"}
                >
                  <div
                    className="rounded-4 border p-3 mb-3"
                    style={{ borderColor: "#e9ecef" }}
                  >
                    <AnimatePresence initial={false}>
                      {isCreateOpen && (
                        <motion.div
                          id="report-create-note"
                          key="create-note"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.2, 0.7, 0.5, 1],
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            className="rounded-4 border p-3 mb-3"
                            style={{ borderColor: "#e9ecef" }}
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
                  </div>
                </div>

                {filteredNotes.length === 0 ? (
                  <div className="alert alert-info text-center rounded-3 mb-0">
                    Bu filtreye uygun not bulunmuyor.
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {filteredNotes.map((note) => {
                      const vehicle = vehicles.find(
                        (v) => v.id === note.vehicleId,
                      );

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
        </div>
      </DashboardBackground>
    </PageWrapper>
  );
}

export default ReportsPage;
