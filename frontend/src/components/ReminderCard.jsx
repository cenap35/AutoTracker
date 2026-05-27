function ReminderCard({ reminder, onToggleComplete, onDelete }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(reminder.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let statusText = "Zaman var";
  let statusClass = "bg-primary";

  if (reminder.isCompleted) {
    statusText = "Tamamlandı";
    statusClass = "bg-success";
  } else if (daysLeft < 0) {
    statusText = `${Math.abs(daysLeft)} gün gecikti`;
    statusClass = "bg-danger";
  } else if (daysLeft === 0) {
    statusText = "Bugün son gün";
    statusClass = "bg-danger";
  } else if (daysLeft <= 7) {
    statusText = `${daysLeft} gün kaldı`;
    statusClass = "bg-warning text-dark";
  } else if (daysLeft <= 30) {
    statusText = `${daysLeft} gün kaldı`;
    statusClass = "bg-info text-dark";
  }

  return (
    <div
      className="reminder-card card h-100"
      style={{
        borderRadius: 16,
        border: `2px solid ${
          reminder.isCompleted
            ? "#62bb6a"
            : daysLeft < 0
            ? "#e53935"
            : daysLeft <= 7
            ? "#ffe082"
            : daysLeft <= 30
            ? "#42baff"
            : "#3b60c5"
        }`,
        background: "transparent",
        boxShadow: "0 3px 20px -14px #3b60c540",
        transition: "box-shadow 0.15s, border-color 0.17s, transform 0.13s cubic-bezier(.62,1.6,.45,.98)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="card-body" style={{ minHeight: 155 }}>
        <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                background:
                  reminder.isCompleted
                    ? "#62bb6a"
                    : daysLeft < 0
                    ? "#e53935"
                    : daysLeft <= 7
                    ? "#ffe082"
                    : daysLeft <= 30
                    ? "#42baff"
                    : "#3b60c5",
                borderRadius: "50%",
                fontSize: 17,
                color:
                  daysLeft < 0
                    ? "#fff"
                    : reminder.isCompleted
                    ? "#fff"
                    : daysLeft <= 7
                    ? "#473c01"
                    : daysLeft <= 30
                    ? "#0d3050"
                    : "#fff",
              }}
            >
              <i
                className={
                  reminder.type === "Sigorta"
                    ? "bi bi-shield-check"
                    : reminder.type === "Kasko"
                    ? "bi bi-shield-shaded"
                    : reminder.type === "MTV"
                    ? "bi bi-cash-stack"
                    : reminder.type === "Muayene"
                    ? "bi bi-clipboard2-check"
                    : "bi bi-bell"
                }
              />
            </span>
            <h5 className="fw-bold mb-0">{reminder.type}</h5>
          </div>

          <span
            className={`badge px-3 py-2 ${statusClass}`}
            style={{
              fontSize: 14,
              borderRadius: 12,
              fontWeight: 600,
              minWidth: 86,
              textAlign: "center",
              letterSpacing: "0.1px"
            }}
          >
            {statusText}
          </span>
        </div>

        <div className="text-muted small mb-2 d-flex align-items-center gap-1">
          <i className="bi bi-car-front me-1 text-primary"></i>
          <span style={{ fontWeight: 500 }}>
            {reminder.vehicleName}
          </span>
          <span style={{ color:"#8090a0" }}>– {reminder.plateNumber}</span>
        </div>

        <div className="mb-1">
          <span className="text-secondary small me-1">
            <strong>Son tarih:</strong>
          </span>
          <span className="small text-dark">
            {dueDate.toLocaleDateString("tr-TR")}
          </span>
        </div>

        {reminder.amount && (
          <div className="mb-1 small">
            <span style={{ color: "#314286" }}>
              <strong>Tutar:</strong>
            </span>{" "}
            ₺{Number(reminder.amount).toLocaleString("tr-TR")}
          </div>
        )}

        {reminder.description && (
          <div className="small mt-1 mb-0" style={{
            color: "#789",
            borderLeft: "3px solid #dde6f9",
            paddingLeft: 8,
            fontStyle: "italic"
          }}>
            {reminder.description}
          </div>
        )}

        {(onToggleComplete || onDelete) && (
          <div className="d-flex gap-2 mt-3 pt-1">
            {onToggleComplete && (
              <button
                className={`btn btn-sm px-3 ${reminder.isCompleted ? "btn-outline-secondary" : "btn-outline-success"} fw-semibold shadow-none`}
                style={{
                  borderRadius: 12,
                  fontWeight: 500,
                  minWidth: 92
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
                  minWidth: 68,
                  fontWeight: 500
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
        .reminder-card {
          background: transparent !important;
          transition: box-shadow 0.15s cubic-bezier(.64,1.5,.47,.98), border-color 0.17s cubic-bezier(.62,1.6,.45,.98), transform 0.13s cubic-bezier(.62,1.6,.45,.98);
        }
        .reminder-card:hover {
          box-shadow: 0 10px 34px -8px #3577c585;
          transform: translateY(-2px) scale(1.013);
          border-color: #3b60c5 !important;
        }
        .reminder-card .btn:hover {
          box-shadow: 0 1px 10px -3px #42baff40;
        }
      `}</style>
    </div>
  );
}

export default ReminderCard;