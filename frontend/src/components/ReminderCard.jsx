function ReminderCard({ reminder, onToggleComplete, onDelete }) {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-bold mb-0">{reminder.type}</h5>

          <span
            className={`badge ${
              reminder.isCompleted ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {reminder.isCompleted ? "Tamamlandı" : "Bekliyor"}
          </span>
        </div>

        <div className="text-muted small mb-2">
          <i className="bi bi-car-front me-1"></i>
          {reminder.vehicleName} - {reminder.plateNumber}
        </div>

        <p className="mb-1">
          <strong>Son tarih:</strong>{" "}
          {new Date(reminder.dueDate).toLocaleDateString("tr-TR")}
        </p>

        {reminder.amount && (
          <p className="mb-1">
            <strong>Tutar:</strong> ₺
            {Number(reminder.amount).toLocaleString("tr-TR")}
          </p>
        )}

        {reminder.description && (
          <p className="text-muted small">{reminder.description}</p>
        )}

        {(onToggleComplete || onDelete) && (
          <div className="d-flex gap-2 mt-3">
            {onToggleComplete && (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => onToggleComplete(reminder)}
              >
                {reminder.isCompleted ? "Geri Al" : "Tamamla"}
              </button>
            )}

            {onDelete && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(reminder.id)}
              >
                Sil
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReminderCard;