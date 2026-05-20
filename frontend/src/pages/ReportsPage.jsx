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
            : item
        )
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

  const priorityColor = {
    Düşük: "success",
    Orta: "warning",
    Yüksek: "danger",
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold text-primary">
            <i className="bi bi-journal-check me-2"></i>
            Araç Notları
          </h1>
          <p className="text-muted">
            Araçlarınıza özel yapılacakları, kontrol notlarını ve planları takip edin.
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-3">Yeni Not Ekle</h4>

            <form onSubmit={handleCreateNote}>
              <div className="row g-3">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    required
                  >
                    <option value="">Araç seç</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Not başlığı"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Not içeriği..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="col-12 text-end">
                  <button className="btn btn-primary fw-bold px-4">
                    <i className="bi bi-plus-lg me-1"></i>
                    Not Ekle
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="alert alert-info shadow-sm">
            Henüz araç notu bulunmuyor.
          </div>
        ) : (
          <div className="row g-4">
            {notes.map((note) => (
              <div className="col-md-6 col-lg-4" key={note.id}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: 16,
                    opacity: note.isCompleted ? 0.65 : 1,
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5
                        className="fw-bold mb-0"
                        style={{
                          textDecoration: note.isCompleted ? "line-through" : "none",
                        }}
                      >
                        {note.title}
                      </h5>

                      <span className={`badge bg-${priorityColor[note.priority]}`}>
                        {note.priority}
                      </span>
                    </div>

                    <p className="text-muted small mb-2">
                      <i className="bi bi-car-front-fill me-1"></i>
                      {note.vehicleName} - {note.plateNumber}
                    </p>

                    {note.content && <p>{note.content}</p>}

                    <div className="small text-muted mb-3">
                      <i className="bi bi-calendar-event me-1"></i>
                      {new Date(note.createdAt).toLocaleDateString("tr-TR")}
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-sm ${
                          note.isCompleted
                            ? "btn-outline-secondary"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleToggleCompleted(note)}
                      >
                        {note.isCompleted ? "Geri Al" : "Tamamlandı"}
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default ReportsPage;