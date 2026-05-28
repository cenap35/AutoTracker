import { useState } from "react";

const PRIMARY = "#3977f5";
const PRIMARY_DEEP = "#245fe0";

const PRIORITY_KEYS = ["Düşük", "Orta", "Yüksek"];

const PILL_BASE = {
  fontWeight: 600,
  fontSize: "0.78rem",
  padding: "0.38em 0.75em",
};

function shadowsFor(note) {
  const done = note.isCompleted;
  return {
    rest: done
      ? "0 1px 3px rgba(15,23,42,0.06)"
      : "0 1px 3px rgba(15,23,42,0.05), 0 10px 28px rgba(57,119,245,0.08)",
    hover: done
      ? "0 6px 20px rgba(15,23,42,0.1)"
      : "0 6px 22px rgba(15,23,42,0.07), 0 16px 40px rgba(57,119,245,0.14)",
    restEdit:
      "0 1px 3px rgba(15,23,42,0.05), 0 10px 24px rgba(57,119,245,0.07)",
    hoverEdit:
      "0 6px 22px rgba(15,23,42,0.07), 0 14px 36px rgba(57,119,245,0.12)",
  };
}

function themeFrom({ isCompleted, priority }) {
  const p = priority || "Orta";
  const done = !!isCompleted;

  const accent = done
    ? "#198754"
    : p === "Yüksek"
      ? "#dc3545"
      : p === "Düşük"
        ? "#198754"
        : PRIMARY;

  const topBar = done
    ? "linear-gradient(118deg, rgba(25,135,84,0.11), rgba(255,255,255,0.95) 60%, #f8fafc)"
    : p === "Yüksek"
      ? "linear-gradient(118deg, rgba(220,53,69,0.09), #fff 55%, rgba(255,251,251,1))"
      : p === "Düşük"
        ? "linear-gradient(118deg, rgba(25,135,84,0.09), #fff 55%, rgba(248,253,249,1))"
        : "linear-gradient(118deg, rgba(57,119,245,0.11), #fff 50%, rgba(248,250,252,1))";

  const badgeByPriority = {
    Yüksek: {
      bg: "rgba(220,53,69,0.12)",
      color: "#b02a37",
      border: "1px solid rgba(220,53,69,0.22)",
    },
    Düşük: {
      bg: "rgba(25,135,84,0.12)",
      color: "#146c43",
      border: "1px solid rgba(25,135,84,0.22)",
    },
    Orta: {
      bg: "rgba(255,193,7,0.18)",
      color: "#856404",
      border: "1px solid rgba(255,193,7,0.35)",
    },
  };

  const status = done
    ? {
        bg: "rgba(25,135,84,0.12)",
        color: "#146c43",
        border: "1px solid rgba(25,135,84,0.25)",
        label: "Tamamlandı",
        icon: "bi-check-circle",
      }
    : {
        bg: "rgba(71,85,105,0.1)",
        color: "#475569",
        border: "1px solid rgba(71,85,105,0.22)",
        label: "Bekliyor",
        icon: "bi-hourglass-split",
      };

  return {
    accent,
    topBar,
    priorityBadge: badgeByPriority[p] || badgeByPriority.Orta,
    status,
  };
}

function SoftPill({ bg, color, border, icon, children }) {
  return (
    <span
      className="badge rounded-pill d-inline-flex align-items-center gap-1 fw-semibold"
      style={{ ...PILL_BASE, background: bg, color, border }}
    >
      {icon ? <i className={`bi ${icon}`} /> : null}
      {children}
    </span>
  );
}

/** Tek kart gövdesi: gölge + lift state ile kontrol */
function NoteCardSurface({ accent, shadow, hovered, children }) {
  return (
    <div
      className="card border-0 mb-3 overflow-hidden"
      style={{
        borderRadius: 14,
        border: "1px solid #e9ecef",
        borderLeft: `4px solid ${accent}`,
        background: "#fff",
        boxShadow: shadow,
        transform: hovered ? "translateY(-2px)" : undefined,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {children}
    </div>
  );
}

function VehicleNoteCard({
  note,
  vehicle,
  onUpdate,
  onToggleComplete,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title || "",
    content: note.content || "",
    priority: note.priority || "Orta",
  });

  const shadows = shadowsFor(note);
  const viewTheme = themeFrom(note);
  const editTheme = themeFrom({
    ...note,
    isCompleted: false,
    priority: editData.priority,
  });

  const accent = isEditing ? editTheme.accent : viewTheme.accent;
  const currentShadow =
    shadows[
      isEditing
        ? lifted
          ? "hoverEdit"
          : "restEdit"
        : lifted
          ? "hover"
          : "rest"
    ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await onUpdate(note.id, {
      title: editData.title,
      content: editData.content,
      priority: editData.priority,
      isCompleted: note.isCompleted,
    });
    setIsEditing(false);
    setLifted(false);
  };

  const handleCancel = () => {
    setEditData({
      title: note.title || "",
      content: note.content || "",
      priority: note.priority || "Orta",
    });
    setIsEditing(false);
    setLifted(false);
  };

  const iconSq = { width: 28, height: 28 };

  const topBarLeadingView = (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="small fw-semibold d-inline-flex align-items-center gap-2 text-secondary">
        <span
          className="d-inline-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
          style={{
            ...iconSq,
            background: "rgba(57,119,245,0.12)",
            color: PRIMARY_DEEP,
          }}
        >
          <i className="bi bi-sticky" style={{ fontSize: "0.95rem" }} />
        </span>
        Araç notu
      </span>
      <div className="d-flex flex-wrap gap-2 justify-content-end">
        <SoftPill {...viewTheme.priorityBadge}>{note.priority}</SoftPill>
        <SoftPill
          bg={viewTheme.status.bg}
          color={viewTheme.status.color}
          border={viewTheme.status.border}
          icon={viewTheme.status.icon}
        >
          {viewTheme.status.label}
        </SoftPill>
      </div>
    </div>
  );

  if (isEditing) {
    return (
      <div
        onMouseEnter={() => setLifted(true)}
        onMouseLeave={() => setLifted(false)}
      >
        <NoteCardSurface
          accent={accent}
          shadow={currentShadow}
          hovered={lifted}
        >
          <div
            className="px-3 py-2 border-bottom"
            style={{ borderColor: "#eef2f7", background: editTheme.topBar }}
          >
            <span className="small text-muted d-inline-flex align-items-center gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                style={{
                  ...iconSq,
                  background: "rgba(57,119,245,0.12)",
                  color: PRIMARY_DEEP,
                }}
              >
                <i
                  className="bi bi-journal-text"
                  style={{ fontSize: "0.9rem" }}
                />
              </span>
              Notu düzenle
            </span>
          </div>
          <div className="card-body p-3">
            <div className="row g-2">
              <div className="col-md-8">
                <label className="form-label small text-muted mb-1">
                  Başlık
                </label>
                <input
                  name="title"
                  className="form-control rounded-3"
                  value={editData.title}
                  onChange={handleChange}
                  placeholder="Not başlığı"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small text-muted mb-1">
                  Öncelik
                </label>
                <select
                  name="priority"
                  className="form-select rounded-3"
                  value={editData.priority}
                  onChange={handleChange}
                >
                  {PRIORITY_KEYS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small text-muted mb-1">
                  İçerik
                </label>
                <textarea
                  name="content"
                  className="form-control rounded-3"
                  rows={3}
                  value={editData.content}
                  onChange={handleChange}
                  placeholder="Not içeriği..."
                />
              </div>
              <div className="col-12 d-flex flex-wrap gap-2 justify-content-end pt-1">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-3 px-3"
                  onClick={handleCancel}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-3 px-3 fw-semibold"
                  onClick={handleSave}
                  style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </NoteCardSurface>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
    >
      <NoteCardSurface accent={accent} shadow={currentShadow} hovered={lifted}>
        <div
          className="px-3 py-2 border-bottom"
          style={{ borderColor: "#eef2f7", background: viewTheme.topBar }}
        >
          {topBarLeadingView}
        </div>

        <div className="card-body p-3">
          {vehicle && (
            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <SoftPill
                bg="rgba(57,119,245,0.12)"
                color={PRIMARY_DEEP}
                border="1px solid rgba(57,119,245,0.18)"
                icon="bi-car-front"
              >
                {vehicle.brand} {vehicle.model}
              </SoftPill>
              {vehicle.plateNumber ? (
                <SoftPill
                  bg="#f8f9fa"
                  color="#495057"
                  border="1px solid #dee2e6"
                  icon="bi-hash"
                >
                  {vehicle.plateNumber}
                </SoftPill>
              ) : null}
            </div>
          )}

          <h6
            className={`fw-bold mb-2 ${note.isCompleted ? "text-success text-decoration-line-through" : ""}`}
            style={{
              color: note.isCompleted ? undefined : "#1e293b",
              letterSpacing: "0.01em",
            }}
          >
            {note.title}
          </h6>

          {note.content ? (
            <div
              className="rounded-3 mb-3 px-3 py-2"
              style={{
                background: note.isCompleted
                  ? "#f8fafc"
                  : "linear-gradient(180deg,#f8fafc,#fff)",
                border: "1px solid #eef2f7",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
              }}
            >
              <p
                className={`small mb-0 ${note.isCompleted ? "text-muted text-decoration-line-through" : "text-secondary"}`}
                style={{ whiteSpace: "pre-wrap", lineHeight: 1.62 }}
              >
                {note.content}
              </p>
            </div>
          ) : (
            <p className="small text-muted fst-italic mb-3">İçerik yok.</p>
          )}

          <div
            className="d-flex flex-wrap gap-2 justify-content-end pt-2 mt-1"
            style={{ borderTop: "1px solid #f1f5f9" }}
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-3 px-3 fw-semibold"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
              onClick={() => {
                setLifted(false);
                setIsEditing(true);
              }}
            >
              <i className="bi bi-pencil me-1" />
              Düzenle
            </button>
            <button
              type="button"
              className={`btn btn-sm px-3 rounded-3 fw-semibold ${note.isCompleted ? "btn-outline-warning" : "btn-outline-success"}`}
              onClick={() => onToggleComplete(note)}
            >
              <i
                className={`bi ${note.isCompleted ? "bi-arrow-counterclockwise" : "bi-check2-circle"} me-1`}
              />
              {note.isCompleted ? "Geri Al" : "Tamamla"}
            </button>
            {!showDeleteConfirm ? (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-3 px-3 fw-semibold"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <i className="bi bi-trash me-1" />
                Sil
              </button>
            ) : (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="small text-danger fw-semibold">
                  Emin misin?
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Vazgeç
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-danger fw-bold"
                  onClick={() => {
                    onDelete(note.id);
                    setShowDeleteConfirm(false);
                  }}
                >
                  Sil
                </button>
              </div>
            )}
          </div>
        </div>
      </NoteCardSurface>
    </div>
  );
}

export default VehicleNoteCard;
