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
    <div className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <h5>{note.title}</h5>

        <span className="badge bg-secondary">{note.priority}</span>
      </div>

      {note.content && <p>{note.content}</p>}

      <p className="text-muted mb-3">
        {note.isCompleted ? "Tamamlandı" : "Bekliyor"}
      </p>

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setIsEditing(true)}
        >
          Düzenle
        </button>

        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => onToggleComplete(note)}
        >
          {note.isCompleted ? "Geri Al" : "Tamamlandı"}
        </button>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(note.id)}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default VehicleNoteCard;