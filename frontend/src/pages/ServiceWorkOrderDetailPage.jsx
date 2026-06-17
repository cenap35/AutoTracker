import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getServiceWorkOrderById,
  updateWorkOrderStatus,
  updateServiceWorkOrder,
} from "../services/serviceWorkOrderService";

function ServiceWorkOrderDetailPage() {
  const { id } = useParams();

  const [workOrder, setWorkOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    mileage: "",
    laborCost: "",
    partsCost: "",
  });

  useEffect(() => {
    loadWorkOrder();
  }, []);

  const loadWorkOrder = async () => {
    const data = await getServiceWorkOrderById(id);
    setWorkOrder(data);
  };

  const startEdit = () => {
    setEditForm({
      title: workOrder.title,
      description: workOrder.description || "",
      mileage: workOrder.mileage,
      laborCost: workOrder.laborCost,
      partsCost: workOrder.partsCost,
    });

    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);

    setEditForm({
      title: "",
      description: "",
      mileage: "",
      laborCost: "",
      partsCost: "",
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: editForm.title,
      description: editForm.description,
      mileage: Number(editForm.mileage),
      laborCost: Number(editForm.laborCost),
      partsCost: Number(editForm.partsCost),
    };

    const updated = await updateServiceWorkOrder(workOrder.id, payload);

    setWorkOrder({
      ...workOrder,
      title: updated.title,
      description: updated.description,
      mileage: updated.mileage,
      laborCost: updated.laborCost,
      partsCost: updated.partsCost,
      totalCost: updated.totalCost,
    });

    cancelEdit();
  };

  const handleStatusChange = async (status) => {
    const result = await updateWorkOrderStatus(workOrder.id, status);

    setWorkOrder({
      ...workOrder,
      status: result.status,
      completedAt: result.completedAt,
    });
  };

  const getStatusText = (status) => {
    if (status === "Pending") return "Bekliyor";
    if (status === "InProgress") return "İşlemde";
    if (status === "Completed") return "Tamamlandı";
    return status;
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-warning text-dark";
    if (status === "InProgress") return "bg-primary";
    if (status === "Completed") return "bg-success";
    return "bg-secondary";
  };

  if (!workOrder) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{workOrder.title}</h2>

        <span className={`badge fs-6 ${getStatusClass(workOrder.status)}`}>
          {getStatusText(workOrder.status)}
        </span>
      </div>

      <div className="card p-3 mb-4">
        <p>
          <strong>Müşteri:</strong> {workOrder.customer.fullName}
        </p>

        <p>
          <strong>Telefon:</strong> {workOrder.customer.phone}
        </p>

        <p>
          <strong>Araç:</strong> {workOrder.vehicle.brand}{" "}
          {workOrder.vehicle.model} - {workOrder.vehicle.plate}
        </p>

        {isEditing ? (
          <form onSubmit={handleUpdateSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Başlık</label>
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
              <label className="form-label">Açıklama</label>
              <textarea
                className="form-control"
                rows="3"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label">KM</label>
                <input
                  type="number"
                  className="form-control"
                  value={editForm.mileage}
                  onChange={(e) =>
                    setEditForm({ ...editForm, mileage: e.target.value })
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">İşçilik</label>
                <input
                  type="number"
                  className="form-control"
                  value={editForm.laborCost}
                  onChange={(e) =>
                    setEditForm({ ...editForm, laborCost: e.target.value })
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Parça</label>
                <input
                  type="number"
                  className="form-control"
                  value={editForm.partsCost}
                  onChange={(e) =>
                    setEditForm({ ...editForm, partsCost: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-success">Kaydet</button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cancelEdit}
              >
                İptal
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>
              <strong>Açıklama:</strong> {workOrder.description}
            </p>

            <p>
              <strong>KM:</strong> {workOrder.mileage}
            </p>

            <p>
              <strong>Durum:</strong> {getStatusText(workOrder.status)}
            </p>

            <div className="mt-3 d-flex flex-wrap gap-2">
              <button className="btn btn-outline-secondary" onClick={startEdit}>
                Düzenle
              </button>

              <button
                className="btn btn-warning"
                onClick={() => handleStatusChange("Pending")}
              >
                Bekliyor
              </button>

              <button
                className="btn btn-primary"
                onClick={() => handleStatusChange("InProgress")}
              >
                İşlemde
              </button>

              <button
                className="btn btn-success"
                onClick={() => handleStatusChange("Completed")}
              >
                Tamamlandı
              </button>
            </div>
          </>
        )}
      </div>

      <div className="card p-3">
        <h4>Ücret Bilgisi</h4>

        <p>
          <strong>İşçilik:</strong> {workOrder.laborCost} ₺
        </p>

        <p>
          <strong>Parça:</strong> {workOrder.partsCost} ₺
        </p>

        <h3>Toplam: {workOrder.totalCost} ₺</h3>
      </div>
    </div>
  );
}

export default ServiceWorkOrderDetailPage;