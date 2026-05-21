import { Link } from "react-router-dom";

function MaintenanceCard({ record, showVehicleInfo = false, onDelete }) {
  return (
    <div
      className="card maintenance-simple-card h-100 border-0 shadow-sm"
      style={{
        borderRadius: 15,
        background: "#f8fbfd",
        boxShadow: "0 2px 16px -9px #266ea922",
        transition: "box-shadow 0.3s, transform 0.2s, background 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 6px 28px -6px #4984cb46";
        e.currentTarget.style.background = "#f4f9fe";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 16px -9px #266ea922";
        e.currentTarget.style.background = "#f8fbfd";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div className="card-body pb-3 d-flex flex-column" style={{ minHeight: 190 }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="fw-semibold"
            style={{
              color: "#3366a9",
              fontSize: 16,
              letterSpacing: ".2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "65%",
              display: "inline-block",
            }}
            title={record.title}
          >
            <i className="bi bi-clipboard-check me-1"></i>
            {record.title}
          </span>
          <span
            className="badge rounded-pill bg-primary text-white"
            style={{ fontSize: 15, fontWeight: 500, padding: "8px 14px" }}
          >
            ₺{Number(record.cost || 0).toLocaleString("tr-TR")}
          </span>
        </div>

        {showVehicleInfo && (
          <div className="mb-2 small" style={{ color: "#576e88" }}>
            <i className="bi bi-car-front-fill text-warning me-1"></i>
            <span className="fw-semibold">{record.vehicleName}</span>
            <span
              className="badge bg-light border ms-2"
              style={{
                color: "#355",
                fontWeight: 500,
                fontSize: 13,
                borderRadius: 6,
              }}
            >
              {record.plateNumber}
            </span>
          </div>
        )}

        {record.description && (
          <div
            className="text-muted mb-2"
            style={{
              fontSize: 14,
              background: "#f3f7fa",
              padding: "6px 10px",
              borderRadius: 6,
              lineHeight: 1.45,
            }}
          >
            {record.description}
          </div>
        )}

        <ul className="list-unstyled mb-1" style={{ fontSize: 14 }}>
          <li className="mb-1" style={{ color: "#547189" }}>
            <i className="bi bi-speedometer2 me-1"></i>
            <span className="fw-normal">{record.mileage?.toLocaleString("tr-TR")}</span> km
          </li>
          <li style={{ color: "#789" }}>
            <i className="bi bi-calendar3 me-1"></i>
            <span>
              {new Date(record.maintenanceDate).toLocaleString("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </li>
        </ul>

        <div className="d-flex justify-content-end gap-2 mt-auto pt-2">
          {showVehicleInfo && record.vehicleId && (
            <Link
              to={`/vehicles/${record.vehicleId}`}
              className="btn btn-link px-2 py-0 fw-semibold"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: 14,
                borderRadius: 7,
                transition: "background 0.18s",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "#eff7ff")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Aracı Gör
            </Link>
          )}

          {onDelete && (
            <button
              className="btn btn-link text-danger px-2 py-0 fw-semibold"
              style={{
                fontSize: 14,
                borderRadius: 7,
                textDecoration: "none",
                transition: "background 0.18s",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "#fff0f0")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "transparent")
              }
              onClick={() => onDelete(record.id)}
            >
              <i className="bi bi-trash me-1"></i>Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaintenanceCard;