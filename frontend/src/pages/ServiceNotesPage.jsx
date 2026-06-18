import { useEffect, useState } from "react";
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
          note.id === id ? { ...note, ...updatedNote } : note
        )
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
          note.id === id
            ? { ...note, isCompleted: result.isCompleted }
            : note
        )
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

        <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-3">
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
              Yeni Not
            </h5>
            <small className="text-muted">
              Servis içinde takip edilmesi gereken kısa notları ekleyin.
            </small>
          </div>

          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Başlık"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="col-md-5">
              <input
                className="form-control"
                placeholder="Not içeriği"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
              />
            </div>

            <div className="col-md-2 d-flex align-items-center">
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
                <label className="form-check-label" htmlFor="isImportant">
                  Önemli
                </label>
              </div>
            </div>

            <div className="col-md-1">
              <button className="btn btn-primary w-100">
                <i className="bi bi-plus-circle" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              Not Listesi
            </h5>

            <span className="badge bg-light text-dark border">
              {notes.length} kayıt
            </span>
          </div>

          {notes.map((note) => (
            <div
              key={note.id}
              className="note-card-hover card border-0 shadow-sm mb-3"
            >
              <div className="card-body">
                {editingNoteId === note.id ? (
                  <form onSubmit={(e) => handleUpdate(e, note.id)}>
                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          className="form-control"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-5">
                        <input
                          className="form-control"
                          value={editForm.content}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-3 d-flex gap-3 align-items-center">
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
                          <label
                            className="form-check-label"
                            htmlFor={`important-${note.id}`}
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor={`completed-${note.id}`}
                          >
                            Tamam
                          </label>
                        </div>
                      </div>

                      <div className="col-12 d-flex gap-2 mt-2">
                        <button className="btn btn-success btn-sm">
                          Kaydet
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={cancelEdit}
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                    <div className="d-flex gap-3 align-items-start">
                      <div
                        className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 16,
                          background: note.isCompleted
                            ? "linear-gradient(135deg, #1a906c, #47c172)"
                            : note.isImportant
                              ? "linear-gradient(135deg, #b78b16, #ffb703)"
                              : "linear-gradient(135deg, #18265a, #3b60c5)",
                          boxShadow: "0 10px 22px rgba(44, 62, 100, .18)",
                        }}
                      >
                        {note.isCompleted ? "✓" : note.isImportant ? "⭐" : "📝"}
                      </div>

                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                          <h5
                            className="mb-0"
                            style={{
                              color: "#18265a",
                              fontWeight: 800,
                              textDecoration: note.isCompleted
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {note.title}
                          </h5>

                          {note.isImportant && (
                            <span className="badge bg-warning text-dark">
                              Önemli
                            </span>
                          )}

                          {note.isCompleted && (
                            <span className="badge bg-success">
                              Tamamlandı
                            </span>
                          )}
                        </div>

                        <p className="text-muted mb-2">
                          {note.content || "Not içeriği eklenmemiş."}
                        </p>

                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-calendar me-1" />
                          {new Date(note.createdAt).toLocaleDateString(
                            "tr-TR"
                          )}
                        </span>
                      </div>
                    </div>

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
                )}
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 36 }}>📝</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                Henüz not yok
              </h5>
              <p className="text-muted mb-0">
                Servis içi notlarınızı buradan ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .note-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .note-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #f5f9ff 88%, #e8f1fd 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceNotesPage;