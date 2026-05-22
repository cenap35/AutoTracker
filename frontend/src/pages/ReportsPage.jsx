import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getVehicleNotes,
  createVehicleNote,
  updateVehicleNote,
  deleteVehicleNote,
} from "../services/vehicleNoteService";

function ReportsPage() {
  const [vehicles, setVehicles] = useState([]);
  const [notes, setNotes] = useState([]);

  const [vehicleId, setVehicleId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Orta");
  const [error, setError] = useState("");

  const [selectedVehicleId, setSelectedVehicleId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  // Düzenlenecek notun id'sini veya null'u tutar
  const [editNoteId, setEditNoteId] = useState(null);
  // Düzenleme formu için local state
  const [editNoteFields, setEditNoteFields] = useState({
    title: "",
    content: "",
    priority: "Orta",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await getVehicles();
        const notesData = await getVehicleNotes();

        setVehicles(vehiclesData);
        setNotes(notesData);
      } catch (err) {
        setError("Araç notları yüklenemedi.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      const newNote = await createVehicleNote({
        vehicleId: Number(vehicleId),
        title,
        content,
        priority,
      });

      setNotes([newNote, ...notes]);
      setVehicleId("");
      setTitle("");
      setContent("");
      setPriority("Orta");
      setError("");
    } catch (err) {
      setError("Not eklenemedi.");
      console.error(err);
    }
  };

  const handleToggleCompleted = async (note) => {
    try {
      await updateVehicleNote(note.id, {
        title: note.title,
        content: note.content,
        priority: note.priority,
        isCompleted: !note.isCompleted,
      });

      setNotes(
        notes.map((item) =>
          item.id === note.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );
    } catch (err) {
      setError("Not güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteVehicleNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError("Not silinemedi.");
      console.error(err);
    }
  };

  // Edit Notu aç
  const startEditingNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteFields({
      title: note.title,
      content: note.content,
      priority: note.priority,
    });
    setError("");
  };

  // Düzenleme formundaki inputlardaki değişiklikler
  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setEditNoteFields((prev) => ({ ...prev, [name]: value }));
  };

  // Kaydet (update) işlemi
  const handleEditNoteSave = async (noteId) => {
    try {
      await updateVehicleNote(noteId, {
        ...editNoteFields,
        isCompleted:
          notes.find((note) => note.id === noteId)?.isCompleted || false,
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                ...editNoteFields,
              }
            : note,
        ),
      );
      setEditNoteId(null);
      setError("");
    } catch (err) {
      setError("Not güncellenemedi.");
      console.error(err);
    }
  };

  // İptal et
  const handleEditNoteCancel = () => {
    setEditNoteId(null);
    setError("");
  };

  const priorityColor = {
    Düşük: "success",
    Orta: "warning",
    Yüksek: "danger",
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

  return (
    <PageWrapper>
      <div
        className="min-vh-100 w-100 px-1 px-sm-2 px-lg-5 py-4"
        style={{
          background: "linear-gradient(120deg, #e0eaff 0%, #fff8f3 100%)",
        }}
      >
        <div className="container-fluid px-0">
          {/* Üst başlık ve filtreler */}
          <div className="mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div>
              <h2
                className="fw-bold text-primary mb-0"
                style={{ fontSize: "2.15rem", letterSpacing: 0.3 }}
              >
                <i className="bi bi-clipboard-check me-2" />
                Raporlar
              </h2>
              <span className="fs-6 text-muted">
                Toplam {notes.length} not kaydı
              </span>
            </div>
            {/* Filtreler */}
            <div className="d-flex gap-2 flex-wrap justify-content-md-end w-100 w-md-auto">
              <select
                className="form-select border-primary"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                style={{ minWidth: 150, minHeight: 45, fontSize: 16 }}
              >
                <option value="all">🚗 Tüm Araçlar</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} - {v.plateNumber}
                  </option>
                ))}
              </select>
              <select
                className="form-select border-primary"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ minWidth: 120, minHeight: 45, fontSize: 16 }}
              >
                <option value="all">Tümü</option>
                <option value="pending">Bekleyen</option>
                <option value="completed">Tamamlanan</option>
              </select>
              <select
                className="form-select border-primary"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{ minWidth: 120, minHeight: 45, fontSize: 16 }}
              >
                <option value="all">Öncelik</option>
                <option value="Düşük">Düşük</option>
                <option value="Orta">Orta</option>
                <option value="Yüksek">Yüksek</option>
              </select>
            </div>
          </div>

          {/* Hata */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3 rounded-3 w-100 mx-auto">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          {/* Not Ekle Formu */}
          <div className="mb-4 bg-light bg-opacity-75 rounded-4 shadow p-3 p-md-4 w-100 mx-auto">
            <form onSubmit={handleCreateNote}>
              <div className="row g-2 mb-2">
                <div className="col-12 col-md-3">
                  <select
                    className="form-select"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    required
                    style={{ minHeight: 44 }}
                  >
                    <option value="">Araç seç...</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.brand} {v.model} - {v.plateNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-5">
                  <input
                    className="form-control"
                    placeholder="Not başlığı"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ minHeight: 44 }}
                  />
                </div>
                <div className="col-12 col-md-2">
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ minHeight: 44 }}
                  >
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                  </select>
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center">
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold w-100 rounded-3 py-2 shadow-sm"
                    style={{ fontSize: 17, minHeight: 44 }}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Ekle
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Notun içeriği..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ resize: "vertical", fontSize: 16, minHeight: 38 }}
                />
              </div>
            </form>
          </div>

          {/* Not Listesi: kart değil, tüm genişlik ve responsive */}
          <div className="w-100">
            {filteredNotes.length === 0 ? (
              <div className="alert alert-info text-center mt-4 rounded-3">
                <i className="bi bi-info-circle me-2"></i>
                Hiç not yok.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="px-0 py-0 mx-0"
                    style={{
                      borderLeft: `6px solid ${
                        note.priority === "Yüksek"
                          ? "#ff7875"
                          : note.priority === "Orta"
                          ? "#ffd666"
                          : "#69c07c"
                      }`,
                      background:
                        note.isCompleted
                          ? "rgba(220, 255, 220, 0.2)"
                          : "rgba(255,255,255,0.95)",
                      boxShadow: "0 1px 10px 0 rgba(0,0,0,0.07)",
                      width: "100%",
                      borderRadius: 18,
                      minHeight: 70,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div className="row align-items-center g-2 px-2 py-2">
                      {/* Sol: Başlık ve detaylar */}
                      <div className="col-12 col-md-8">
                        {editNoteId === note.id ? (
                          <form
                            className="d-flex flex-column gap-2 mb-1"
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleEditNoteSave(note.id);
                            }}
                          >
                            <div className="d-flex align-items-center gap-3 mb-1 flex-wrap">
                              <select
                                name="priority"
                                value={editNoteFields.priority}
                                onChange={handleEditFieldChange}
                                className={`form-select form-select-sm`}
                                style={{
                                  fontSize: 14,
                                  minWidth: 66,
                                  borderRadius: 8,
                                  maxWidth: 80,
                                }}
                              >
                                <option value="Düşük">Düşük</option>
                                <option value="Orta">Orta</option>
                                <option value="Yüksek">Yüksek</option>
                              </select>
                              <input
                                name="title"
                                value={editNoteFields.title}
                                onChange={handleEditFieldChange}
                                className="form-control form-control-sm fw-semibold"
                                required
                                style={{
                                  fontSize: 17,
                                  fontWeight: "bold",
                                  minWidth: 120,
                                }}
                                placeholder="Başlık"
                              />
                            </div>
                            <textarea
                              name="content"
                              className="form-control form-control-sm mb-1"
                              rows={2}
                              value={editNoteFields.content}
                              onChange={handleEditFieldChange}
                              style={{
                                resize: "vertical",
                                fontSize: 15,
                                color: note.isCompleted ? "#aaa" : "#444",
                                minHeight: 32,
                              }}
                              placeholder="Notun içeriği..."
                            />
                            <div className="d-flex gap-2 flex-wrap">
                              <button
                                className="btn btn-sm btn-success fw-bold shadow-sm rounded-3 px-3"
                                type="submit"
                                style={{ minWidth: 70 }}
                              >
                                <i className="bi bi-save me-1"></i>Kaydet
                              </button>
                              <button
                                className="btn btn-sm btn-secondary fw-bold shadow-sm rounded-3 px-3"
                                type="button"
                                onClick={handleEditNoteCancel}
                                style={{ minWidth: 70 }}
                              >
                                <i className="bi bi-x-lg me-1"></i>İptal
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="d-flex align-items-center gap-3 flex-wrap mb-1">
                              <span
                                className={`badge bg-${priorityColor[note.priority] ?? "secondary"} px-2 py-1`}
                                style={{
                                  fontSize: 14,
                                  minWidth: 66,
                                  borderRadius: 8,
                                  letterSpacing: 0.5,
                                }}
                              >
                                {note.priority}
                              </span>
                              <span
                                className={`text-break ${
                                  note.isCompleted
                                    ? "text-decoration-line-through text-secondary"
                                    : "fw-semibold text-dark"
                                }`}
                                style={{ fontSize: 19, wordBreak: "break-word" }}
                              >
                                {note.title}
                              </span>
                            </div>
                            <div className="text-muted small mb-1 d-flex flex-wrap align-items-center gap-2">
                              <span>
                                <i className="bi bi-car-front me-1"></i>
                                {note.vehicleName} - {note.plateNumber}
                              </span>
                              <span>·</span>
                              <span>
                                <i className="bi bi-calendar-event me-1"></i>
                                {new Date(note.createdAt).toLocaleDateString("tr-TR")}
                              </span>
                              {note.isCompleted && (
                                <span className="ms-2 badge bg-success bg-opacity-75 px-2 py-1">
                                  <i className="bi bi-check-circle me-1"></i>Tamamlandı
                                </span>
                              )}
                            </div>
                            {note.content && (
                              <div
                                className="text-body mb-1 ps-2"
                                style={{
                                  borderLeft: "3px solid #f1f5f9",
                                  fontStyle: "italic",
                                  fontSize: 15,
                                  color: note.isCompleted ? "#aaa" : "#444",
                                  wordBreak: "break-word",
                                }}
                              >
                                {note.content}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {/* Sağ: Aksiyon butonları */}
                      <div className="col-12 col-md-4 d-flex flex-row justify-content-end gap-2 mt-2 mt-md-0">
                        <button
                          className={`btn btn-sm rounded-3 fw-bold shadow-sm px-3 ${
                            note.isCompleted
                              ? "btn-outline-success"
                              : "btn-outline-secondary"
                          }`}
                          title={note.isCompleted ? "Geri Al" : "Tamamla"}
                          onClick={() => handleToggleCompleted(note)}
                          style={{ minWidth: 110, minHeight: 36, fontSize: 15 }}
                          disabled={editNoteId === note.id}
                        >
                          <i
                            className={
                              note.isCompleted
                                ? "bi bi-arrow-90deg-left"
                                : "bi bi-check-circle"
                            }
                          ></i>
                          <span className="ms-1">
                            {note.isCompleted ? "Geri Al" : "Tamamlandı"}
                          </span>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary rounded-3 fw-bold shadow-sm px-3"
                          title="Düzenle"
                          onClick={() => startEditingNote(note)}
                          style={{ minWidth: 55, minHeight: 36, fontSize: 15 }}
                          disabled={editNoteId === note.id}
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="ms-1">Düzenle</span>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-3 fw-bold shadow-sm px-3"
                          title="Sil"
                          onClick={() => handleDeleteNote(note.id)}
                          style={{ minWidth: 55, minHeight: 36, fontSize: 15 }}
                          disabled={editNoteId === note.id}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="ms-1">Sil</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReportsPage;
