function ReminderCard({ reminder, onToggleComplete, onDelete }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(reminder.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let statusText = "Zaman var";
  let statusClass = "bg-primary-subtle text-primary border";
  let accentColor = "#3b60c5";

  if (reminder.isCompleted) {
    statusText = "Tamamlandı";
    statusClass = "bg-success-subtle text-success border";
    accentColor = "#22a06b";
  } else if (daysLeft < 0) {
    statusText = `${Math.abs(daysLeft)} gün gecikti`;
    statusClass = "bg-danger-subtle text-danger border";
    accentColor = "#dc3545";
  } else if (daysLeft === 0) {
    statusText = "Bugün son gün";
    statusClass = "bg-danger-subtle text-danger border";
    accentColor = "#dc3545";
  } else if (daysLeft <= 7) {
    statusText = `${daysLeft} gün kaldı`;
    statusClass = "bg-warning-subtle text-warning-emphasis border";
    accentColor = "#f0ad00";
  } else if (daysLeft <= 30) {
    statusText = `${daysLeft} gün kaldı`;
    statusClass = "bg-info-subtle text-info-emphasis border";
    accentColor = "#2f9edb";
  }

  const iconClass =
    reminder.type === "Sigorta"
      ? "bi bi-shield-check"
      : reminder.type === "Kasko"
      ? "bi bi-shield-shaded"
      : reminder.type === "MTV"
      ? "bi bi-cash-stack"
      : reminder.type === "Muayene"
      ? "bi bi-clipboard2-check"
      : "bi bi-bell";

  return (
    <div
      className="reminder-card card border-0 shadow-sm h-100"
      style={{
        borderRadius: 18,
        background: "linear-gradient(120deg, #ffffff 0%, #f5f8ff 100%)",
        boxShadow: "0 8px 28px -18px rgba(59, 96, 197, 0.45)",
        transition:
          "box-shadow 0.18s ease, transform 0.16s ease, border-color 0.16s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: accentColor,
        }}
      />

      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
          <div className="d-flex align-items-center gap-2">
            <span
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: `${accentColor}18`,
                color: accentColor,
                fontSize: 18,
              }}
            >
              <i className={iconClass}></i>
            </span>

            <div>
              <h5 className="fw-bold mb-0" style={{ color: "#284185" }}>
                {reminder.type}
              </h5>
              <div className="text-muted small">Araç takibi</div>
            </div>
          </div>

          <span
            className={`badge px-3 py-2 ${statusClass}`}
            style={{
              fontSize: 13,
              borderRadius: 999,
              fontWeight: 700,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {statusText}
          </span>
        </div>

        <div className="text-muted small mb-3 d-flex align-items-center gap-1">
          <i className="bi bi-car-front me-1" style={{ color: "#3b60c5" }}></i>
          <span className="fw-semibold" style={{ color: "#4a5b75" }}>
            {reminder.vehicleName}
          </span>
          <span style={{ color: "#8090a0" }}>– {reminder.plateNumber}</span>
        </div>

        <div
          className="rounded-3 p-3 mb-3"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid #e5ecfb",
          }}
        >
          <div className="d-flex justify-content-between gap-2 mb-2">
            <span className="small text-muted fw-semibold">
              <i className="bi bi-calendar-event me-1"></i>
              Son tarih
            </span>
            <span className="small fw-bold" style={{ color: "#284185" }}>
              {dueDate.toLocaleDateString("tr-TR")}
            </span>
          </div>

          {reminder.amount && (
            <div className="d-flex justify-content-between gap-2">
              <span className="small text-muted fw-semibold">
                <i className="bi bi-currency-exchange me-1"></i>
                Tutar
              </span>
              <span className="small fw-bold" style={{ color: "#284185" }}>
                ₺{Number(reminder.amount).toLocaleString("tr-TR")}
              </span>
            </div>
          )}
        </div>

        {reminder.description && (
          <div
            className="small mb-0"
            style={{
              color: "#667085",
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: 10,
              fontStyle: "italic",
              lineHeight: 1.45,
            }}
          >
            {reminder.description}
          </div>
        )}

        {(onToggleComplete || onDelete) && (
          <div className="d-flex gap-2 mt-3 pt-1">
            {onToggleComplete && (
              <button
                className={`btn btn-sm fw-semibold px-3 shadow-none ${
                  reminder.isCompleted
                    ? "btn-outline-secondary"
                    : "btn-outline-success"
                }`}
                style={{
                  borderRadius: 12,
                  minWidth: 96,
                }}
                onClick={() => onToggleComplete(reminder)}
              >
                {reminder.isCompleted ? (
                  <>
                    <i className="bi bi-arrow-counterclockwise me-1" />
                    Geri Al
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-1" />
                    Tamamla
                  </>
                )}
              </button>
            )}

            {onDelete && (
              <button
                className="btn btn-sm btn-outline-danger fw-semibold px-3 shadow-none"
                style={{
                  borderRadius: 12,
                  minWidth: 72,
                }}
                onClick={() => onDelete(reminder.id)}
              >
                <i className="bi bi-trash me-1" />
                Sil
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .reminder-card:hover {
          box-shadow: 0 14px 34px -18px rgba(59, 96, 197, 0.75) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}

export default ReminderCard;