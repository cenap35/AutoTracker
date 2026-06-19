import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

import {
  getNotes,
  createNote,
  updateNote,
  toggleNote,
  deleteNote,
} from "../services/serviceNoteService";

function ServiceNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    title: "",
    content: "",
    isImportant: false,
  });

  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    isImportant: false,
    isCompleted: false,
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      toast.error("Notlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = notes.length;
    const important = notes.filter((note) => note.isImportant).length;
    const completed = notes.filter((note) => note.isCompleted).length;
    const active = notes.filter((note) => !note.isCompleted).length;

    return { total, important, completed, active };
  }, [notes]);

  const filteredNotes = useMemo(() => {
    if (filter === "Important") {
      return notes.filter((note) => note.isImportant && !note.isCompleted);
    }

    if (filter === "Completed") {
      return notes.filter((note) => note.isCompleted);
    }

    if (filter === "Active") {
      return notes.filter((note) => !note.isCompleted);
    }

    return notes;
  }, [notes, filter]);

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      isImportant: false,
    });
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditForm({
      title: "",
      content: "",
      isImportant: false,
      isCompleted: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdNote = await createNote(form);
      setNotes([createdNote, ...notes]);
      resetForm();
      toast.success("Not eklendi.");
    } catch (err) {
      console.error(err);
      toast.error("Not eklenemedi.");
    }
  };

  const startEdit = (note) => {
    setEditingNoteId(note.id);
    setEditForm({
      title: note.title,
      content: note.content || "",
      isImportant: note.isImportant,
      isCompleted: note.isCompleted,
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const updatedNote = await updateNote(id, editForm);

      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, ...updatedNote } : note,
        ),
      );

      cancelEdit();
      toast.success("Not güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Not güncellenemedi.");
    }
  };

  const handleToggle = async (id) => {
    try {
      const result = await toggleNote(id);

      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, isCompleted: result.isCompleted } : note,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error("Not durumu güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu notu silmek istiyor musun?");
    if (!confirmed) return;

    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Not silindi.");
    } catch (err) {
      console.error(err);
      toast.error("Not silinemedi.");
    }
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "-";

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Notlar yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="📝"
          title="Notlar"
          subtitle="Servis içi hızlı notları, önemli işleri ve hatırlatmaları yönetin."
        />

        <div className="notes-hero card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
              <div>
                <h4 className="mb-1" style={{ color: "#18265a", fontWeight: 850 }}>
                  Servis görev panosu
                </h4>
                <p className="text-muted mb-0">
                  Günlük yapılacakları, önemli hatırlatmaları ve tamamlanan işleri tek yerde takip edin.
                </p>
              </div>

              <span className="badge bg-primary-subtle text-primary border px-3 py-2">
                {stats.active} aktif not
              </span>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <NoteStatCard icon="🗂️" title="Toplam Not" value={stats.total} tone="#3b60c5" />
          <NoteStatCard icon="🔥" title="Aktif" value={stats.active} tone="#b78b16" />
          <NoteStatCard icon="⭐" title="Önemli" value={stats.important} tone="#ffb703" />
          <NoteStatCard icon="✅" title="Tamamlanan" value={stats.completed} tone="#1a906c" />
        </div>

        <form onSubmit={handleSubmit} className="note-panel card border-0 shadow-sm p-3 p-md-4 mb-4">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
            <div>
              <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 850 }}>
                Yeni Not
              </h5>
              <small className="text-muted">
                Serviste takip edilmesi gereken kısa not veya görev ekleyin.
              </small>
            </div>

            <div className="form-check">
              <input
                id="isImportant"
                className="form-check-input"
                type="checkbox"
                checked={form.isImportant}
                onChange={(e) =>
                  setForm({ ...form, isImportant: e.target.checked })
                }
              />
              <label className="form-check-label fw-semibold" htmlFor="isImportant">
                Önemli
              </label>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-lg-4">
              <input
                className="form-control"
                placeholder="Başlık"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="col-lg-6">
              <input
                className="form-control"
                placeholder="Not içeriği"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
              />
            </div>

            <div className="col-lg-2">
              <button className="btn btn-primary w-100">
                <i className="bi bi-plus-circle me-2" />
                Ekle
              </button>
            </div>
          </div>
        </form>

        <div className="card border-0 shadow-sm p-3 mb-4 note-panel">
          <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div>
              <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 850 }}>
                Not Listesi
              </h5>
              <small className="text-muted">
                Filtreleyerek aktif, önemli veya tamamlanan notları görün.
              </small>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <FilterButton active={filter === "All"} onClick={() => setFilter("All")}>
                Tümü
              </FilterButton>
              <FilterButton active={filter === "Active"} onClick={() => setFilter("Active")}>
                Aktif
              </FilterButton>
              <FilterButton active={filter === "Important"} onClick={() => setFilter("Important")}>
                Önemli
              </FilterButton>
              <FilterButton active={filter === "Completed"} onClick={() => setFilter("Completed")}>
                Tamamlanan
              </FilterButton>
            </div>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center rounded-4">
            <div style={{ fontSize: 42 }}>📝</div>
            <h5 className="mt-3" style={{ color: "#18265a", fontWeight: 850 }}>
              Not bulunamadı
            </h5>
            <p className="text-muted mb-0">
              Seçili filtreye uygun not yok. Yeni not ekleyerek başlayabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-card-hover card border-0 shadow-sm">
                <div className="card-body p-4">
                  {editingNoteId === note.id ? (
                    <form onSubmit={(e) => handleUpdate(e, note.id)}>
                      <div className="mb-2">
                        <input
                          className="form-control"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          rows="3"
                          value={editForm.content}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="d-flex gap-3 align-items-center flex-wrap mb-3">
                        <div className="form-check">
                          <input
                            id={`important-${note.id}`}
                            className="form-check-input"
                            type="checkbox"
                            checked={editForm.isImportant}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                isImportant: e.target.checked,
                              })
                            }
                          />
                          <label className="form-check-label" htmlFor={`important-${note.id}`}>
                            Önemli
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id={`completed-${note.id}`}
                            className="form-check-input"
                            type="checkbox"
                            checked={editForm.isCompleted}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                isCompleted: e.target.checked,
                              })
                            }
                          />
                          <label className="form-check-label" htmlFor={`completed-${note.id}`}>
                            Tamamlandı
                          </label>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm">Kaydet</button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={cancelEdit}
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`note-icon ${note.isCompleted ? "done" : note.isImportant ? "important" : ""}`}>
                            {note.isCompleted ? "✓" : note.isImportant ? "⭐" : "📝"}
                          </div>

                          <div>
                            <h5
                              className="mb-1"
                              style={{
                                color: "#18265a",
                                fontWeight: 850,
                                textDecoration: note.isCompleted ? "line-through" : "none",
                              }}
                            >
                              {note.title}
                            </h5>

                            <div className="d-flex gap-2 flex-wrap">
                              {note.isImportant && (
                                <span className="badge bg-warning text-dark">Önemli</span>
                              )}
                              {note.isCompleted && (
                                <span className="badge bg-success">Tamamlandı</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted mb-3 note-content">
                        {note.content || "Not içeriği eklenmemiş."}
                      </p>

                      <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-calendar me-1" />
                          {formatDate(note.createdAt)}
                        </span>

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            className={
                              note.isCompleted
                                ? "btn btn-outline-warning btn-sm"
                                : "btn btn-outline-success btn-sm"
                            }
                            onClick={() => handleToggle(note.id)}
                          >
                            {note.isCompleted ? "Geri Al" : "Tamamla"}
                          </button>

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => startEdit(note)}
                          >
                            Düzenle
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(note.id)}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <style>
          {`
            .notes-hero {
              border-radius: 24px;
              background:
                radial-gradient(circle at top right, rgba(59,96,197,.12), transparent 35%),
                linear-gradient(135deg, #ffffff 0%, #f6f9ff 100%);
            }

            .note-panel {
              border-radius: 20px;
            }

            .notes-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
              gap: 16px;
            }

            .note-card-hover {
              border-radius: 20px;
              transition:
                box-shadow .22s ease,
                transform .22s ease,
                background .18s ease;
            }

            .note-card-hover:hover {
              box-shadow: 0 14px 34px rgba(44, 62, 100, 0.16) !important;
              background: linear-gradient(95deg, #ffffff 80%, #f5f9ff 100%);
              transform: translateY(-3px);
            }

            .note-icon {
              width: 50px;
              height: 50px;
              border-radius: 16px;
              background: linear-gradient(135deg, #18265a, #3b60c5);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 23px;
              box-shadow: 0 10px 22px rgba(44, 62, 100, .18);
              flex-shrink: 0;
            }

            .note-icon.important {
              background: linear-gradient(135deg, #b78b16, #ffb703);
            }

            .note-icon.done {
              background: linear-gradient(135deg, #1a906c, #47c172);
            }

            .note-content {
              min-height: 48px;
              line-height: 1.6;
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

function NoteStatCard({ icon, title, value, tone }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className="note-card-hover card border-0 shadow-sm h-100">
        <div className="card-body p-3 d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              background: `${tone}18`,
              color: tone,
              fontSize: 24,
            }}
          >
            {icon}
          </div>

          <div>
            <div className="text-muted small">{title}</div>
            <div className="h4 fw-bold mb-0" style={{ color: "#18265a" }}>
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={active ? "btn btn-primary btn-sm" : "btn btn-outline-primary btn-sm"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ServiceNotesPage;