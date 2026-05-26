import { useState } from "react";

function VehicleNoteCard({ note, onUpdate, onToggleComplete, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title || "",
    content: note.content || "",
    priority: note.priority || "Orta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await onUpdate(note.id, {
      title: editData.title,
      content: editData.content,
      priority: editData.priority,
      isCompleted: note.isCompleted,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: note.title || "",
      content: note.content || "",
      priority: note.priority || "Orta",
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border rounded p-3 mb-3 bg-light">
        <div className="row g-2">
          <div className="col-md-8">
            <input
              name="title"
              className="form-control"
              value={editData.title}
              onChange={handleChange}
              placeholder="Not başlığı"
              required
            />
          </div>

          <div className="col-md-4">
            <select
              name="priority"
              className="form-select"
              value={editData.priority}
              onChange={handleChange}
            >
              <option value="Düşük">Düşük</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
            </select>
          </div>

          <div className="col-12">
            <textarea
              name="content"
              className="form-control"
              rows={2}
              value={editData.content}
              onChange={handleChange}
              placeholder="Not içeriği"
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end">
            <button className="btn btn-success btn-sm" onClick={handleSave}>
              Kaydet
            </button>

            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
              İptal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card shadow-sm mb-3"
      style={{
        borderRadius: 16,
        border: note.isCompleted
          ? "2px solid #198754"
          : "2px solid #d1e7dd",
        background:
          note.priority === "Yüksek"
            ? "linear-gradient(90deg,#ffe5e9 0,#fff5e5 100%)"
            : note.priority === "Orta"
              ? "linear-gradient(90deg,#e7f1ff 0,#f2f7ff 100%)"
              : "linear-gradient(90deg,#eefbe7 0,#f7fff2 100%)",
        opacity: note.isCompleted ? 0.85 : 1,
        transition: "all 0.2s",
      }}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <h5
              className={`mb-0 ${note.isCompleted ? "text-decoration-line-through text-success" : "text-dark"
                }`}
              style={{ fontWeight: 600, letterSpacing: ".5px" }}
            >
              <i
                className={
                  note.isCompleted
                    ? "bi bi-check2-square me-2 text-success"
                    : "bi bi-clipboard me-2 text-primary"
                }
                style={{ fontSize: 18 }}
              ></i>
              {note.title}
            </h5>
            <span
              className={`badge ${
                note.priority === "Yüksek"
                  ? "bg-danger"
                  : note.priority === "Orta"
                  ? "bg-warning text-dark"
                  : "bg-success"
              } fs-6`}
              style={{ letterSpacing: ".3px" }}
            >
              {note.priority}
            </span>
          </div>
          <span
            className={`badge rounded-pill px-3 py-2 fs-7 ${
              note.isCompleted ? "bg-success" : "bg-secondary"
            } `}
          >
            {note.isCompleted ? (
              <>
                <i className="bi bi-check-circle me-1"></i> Tamamlandı
              </>
            ) : (
              <>
                <i className="bi bi-hourglass-split me-1"></i> Bekliyor
              </>
            )}
          </span>
        </div>

        {note.content && (
          <p
            className={`mb-3 ${note.isCompleted
              ? "text-muted text-decoration-line-through"
              : ""
              }`}
            style={{ fontSize: 15 }}
          >
            {note.content}
          </p>
        )}

        <div className="d-flex gap-2 justify-content-end">
          <button
            className="btn btn-outline-primary btn-sm px-3"
            onClick={() => setIsEditing(true)}
            title="Düzenle"
            style={{ borderRadius: 8 }}
          >
            <i className="bi bi-pencil me-1"></i>Düzenle
          </button>

          <button
            className={`btn btn-sm px-3 ${
              note.isCompleted
                ? "btn-outline-warning"
                : "btn-outline-success"
            }`}
            onClick={() => onToggleComplete(note)}
            title={note.isCompleted ? "Notu bekleyen olarak geri al" : "Notu tamamla"}
            style={{ borderRadius: 8 }}
          >
            <i className={note.isCompleted ? "bi bi-arrow-counterclockwise me-1" : "bi bi-check2-circle me-1"}></i>
            {note.isCompleted ? "Geri Al" : "Tamamla"}
          </button>

          <button
            className="btn btn-outline-danger btn-sm px-3"
            onClick={() => onDelete(note.id)}
            title="Sil"
            style={{ borderRadius: 8 }}
          >
            <i className="bi bi-trash me-1"></i>Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleNoteCard;