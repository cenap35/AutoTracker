import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function MaintenanceCard({
  record,
  showVehicleInfo = false,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: record.title || "",
    description: record.description || "",
    mileage: record.mileage || "",
    cost: record.cost || "",
    maintenanceDate: record.maintenanceDate
      ? record.maintenanceDate.slice(0, 16)
      : "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!onUpdate) return;

    if (editData.title.trim().length === 0) {
      toast.error("Başlık boş olamaz.");
      return;
    }

    if (editData.title.length > 80) {
      toast.error("Başlık en fazla 80 karakter olabilir.");
      return;
    }

    if (editData.description.length > 300) {
      toast.error("Açıklama en fazla 300 karakter olabilir.");
      return;
    }

    if (Number(editData.mileage) < 0 || Number(editData.mileage) > 2000000) {
      toast.error("KM değeri 0 ile 2.000.000 arasında olmalıdır.");
      return;
    }

    if (Number(editData.cost) < 0 || Number(editData.cost) > 10000000) {
      toast.error("Maliyet 0 ile 10.000.000 arasında olmalıdır.");
      return;
    }

    await onUpdate(record.id, {
      title: editData.title,
      description: editData.description,
      mileage: Number(editData.mileage),
      cost: Number(editData.cost),
      maintenanceDate: new Date(editData.maintenanceDate).toISOString(),
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: record.title || "",
      description: record.description || "",
      mileage: record.mileage || "",
      cost: record.cost || "",
      maintenanceDate: record.maintenanceDate
        ? record.maintenanceDate.slice(0, 16)
        : "",
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="card border-0 shadow-sm h-100"
        style={{ borderRadius: 13, background: "#f7faff" }}
      >
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12">
              <input
                name="title"
                className="form-control form-control-sm"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Başlık"
                maxLength={80}
                required
              />
              <div
                className={`text-end small mt-1 ${
                  editData.title.length >= 80
                    ? "text-danger fw-semibold"
                    : "text-muted"
                }`}
              >
                {editData.title.length}/80
                {editData.title.length >= 80 && (
                  <span className="ms-2">Karakter sınırına ulaşıldı.</span>
                )}
              </div>
            </div>

            <div className="col-12">
              <textarea
                name="description"
                className="form-control form-control-sm"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="Açıklama"
                rows={3}
                maxLength={300}
              />
              <div
                className={`text-end small mt-1 ${
                  editData.description.length >= 300
                    ? "text-danger fw-semibold"
                    : "text-muted"
                }`}
              >
                {editData.description.length}/300
                {editData.description.length >= 300 && (
                  <span className="ms-2">Karakter sınırına ulaşıldı.</span>
                )}
              </div>
            </div>

            <div className="col-6">
              <input
                name="mileage"
                type="number"
                className="form-control form-control-sm"
                value={editData.mileage}
                onChange={handleEditChange}
                placeholder="Km"
                min={0}
                max={2000000}
              />
            </div>

            <div className="col-6">
              <input
                name="cost"
                type="number"
                className="form-control form-control-sm"
                value={editData.cost}
                onChange={handleEditChange}
                placeholder="Maliyet"
                min={0}
                max={10000000}
              />
            </div>

            <div className="col-12">
              <input
                name="maintenanceDate"
                type="datetime-local"
                className="form-control form-control-sm"
                value={editData.maintenanceDate}
                onChange={handleEditChange}
              />
            </div>

            <div className="col-12 d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-sm btn-success" onClick={handleSave}>
                Kaydet
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleCancel}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        className="card maintenance-simple-card h-100 border-0 shadow-sm"
        style={{
          borderRadius: 15,
          background: "#f8fbfd",
          boxShadow: "0 2px 16px -9px #266ea922",
          transition: "box-shadow 0.3s, transform 0.2s, background 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 28px -6px #4984cb46";
          e.currentTarget.style.background = "#f4f9fe";
          e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 16px -9px #266ea922";
          e.currentTarget.style.background = "#f8fbfd";
          e.currentTarget.style.transform = "none";
        }}
      >
        <div
          className="card-body pb-3 d-flex flex-column"
          style={{ minHeight: 190 }}
        >
          <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
            <div
              className="fw-semibold"
              style={{
                color: "#3366a9",
                fontSize: 16,
                letterSpacing: ".2px",
                lineHeight: 1.4,
                wordBreak: "break-word",
                flex: 1,
              }}
              title={record.title}
            >
              <i className="bi bi-clipboard-check me-1"></i>
              {record.title}
            </div>

            <span
              className="badge rounded-pill bg-primary text-white"
              style={{
                fontSize: 15,
                fontWeight: 500,
                padding: "8px 14px",
                whiteSpace: "nowrap",
              }}
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
                display: isExpanded ? "block" : "-webkit-box",

                WebkitLineClamp: isExpanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {record.description}
            </div>
          )}

          <button
            type="button"
            className="btn btn-link p-0 mb-2 fw-semibold text-decoration-none"
            style={{
              fontSize: 13,
              color: "#2563eb",
              alignSelf: "flex-start",
            }}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Daha Az Göster" : "Devamını Gör"}
          </button>

          <ul className="list-unstyled mb-1" style={{ fontSize: 14 }}>
            <li className="mb-1" style={{ color: "#547189" }}>
              <i className="bi bi-speedometer2 me-1"></i>
              <span className="fw-normal">
                {record.mileage?.toLocaleString("tr-TR")}
              </span>{" "}
              km
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#eff7ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Aracı Gör
              </Link>
            )}

            {onUpdate && (
              <button
                className="btn btn-outline-primary btn-sm px-3"
                style={{ borderRadius: 8 }}
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil me-1"></i>
                Düzenle
              </button>
            )}
            {onDelete &&
              (!showDeleteConfirm ? (
                <button
                  className="btn btn-link text-danger px-2 py-0 fw-semibold"
                  style={{
                    fontSize: 14,
                    borderRadius: 7,
                    textDecoration: "none",
                    transition: "background 0.18s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fff0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <i className="bi bi-trash me-1"></i>Sil
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
                      onDelete(record.id);
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Sil
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MaintenanceCard;
