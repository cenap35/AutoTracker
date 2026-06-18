import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import {
  getServiceWorkOrderById,
  updateWorkOrderStatus,
  updateServiceWorkOrder,
} from "../services/serviceWorkOrderService";

import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceWorkOrderDetailPage() {
  const { id } = useParams();

  const [workOrder, setWorkOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    try {
      setLoading(true);
      const data = await getServiceWorkOrderById(id);
      setWorkOrder(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("İş emri detayları yüklenemedi.");
      toast.error("İş emri detayları yüklenemedi.");
    } finally {
      setLoading(false);
    }
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

    try {
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
      toast.success("İş emri güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("İş emri güncellenemedi.");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      const result = await updateWorkOrderStatus(workOrder.id, status);

      setWorkOrder({
        ...workOrder,
        status: result.status,
        completedAt: result.completedAt,
      });

      toast.success("İş emri durumu güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Durum güncellenemedi.");
    }
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
  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWorkDuration = (createdAt, completedAt) => {
    if (!createdAt || !completedAt) return "-";

    const start = new Date(createdAt);
    const end = new Date(completedAt);

    const diffMs = end - start;

    if (diffMs <= 0) return "-";

    const totalMinutes = Math.floor(diffMs / 1000 / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) return `${days} gün ${hours} saat ${minutes} dk`;
    if (hours > 0) return `${hours} saat ${minutes} dk`;

    return `${minutes} dk`;
  };

  const getStatusIcon = (status) => {
    if (status === "Pending") return "bi-hourglass-split";
    if (status === "InProgress") return "bi-gear";
    if (status === "Completed") return "bi-check-circle";
    return "bi-circle";
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="İş emri detayları yükleniyor..." />
      </PageWrapper>
    );
  }

  if (!workOrder) {
    return (
      <PageWrapper>
        <div className="card border-0 shadow-sm p-4 text-center">
          <div style={{ fontSize: 36 }}>🛠️</div>
          <h5 className="mt-2" style={{ color: "#18265a", fontWeight: 800 }}>
            İş emri bulunamadı
          </h5>
          <p className="text-muted mb-0">
            Aradığınız iş emri kaydı bulunamadı.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="🛠️"
          title={workOrder.title}
          subtitle="İş emri detayları"
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                  <div>
                    <h5
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 800 }}
                    >
                      İş Emri Bilgileri
                    </h5>

                    <span
                      className={`badge ${getStatusClass(workOrder.status)}`}
                    >
                      <i
                        className={`bi ${getStatusIcon(workOrder.status)} me-1`}
                      />
                      {getStatusText(workOrder.status)}
                    </span>
                  </div>

                  {!isEditing && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={startEdit}
                    >
                      Düzenle
                    </button>
                  )}
                </div>

                <div className="d-flex gap-3 align-items-start mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #b78b16, #ffb703)",
                      boxShadow: "0 10px 22px rgba(255, 183, 3, .22)",
                    }}
                  >
                    <i className="bi bi-tools fs-4" />
                  </div>

                  <div>
                    <h4
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      {workOrder.title}
                    </h4>

                    <div className="text-muted small mb-2">
                      <i className="bi bi-person me-1" />
                      {workOrder.customer.fullName} / {workOrder.customer.phone}
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-car-front me-1" />
                        {workOrder.vehicle.brand} {workOrder.vehicle.model}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-credit-card-2-front me-1" />
                        {workOrder.vehicle.plate}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-speedometer2 me-1" />
                        {workOrder.mileage} KM
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-clock me-1" />
                        Oluşturuldu: {formatDateTime(workOrder.createdAt)}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-check2-circle me-1" />
                        Tamamlandı: {formatDateTime(workOrder.completedAt)}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-hourglass-split me-1" />
                        Süre:{" "}
                        {getWorkDuration(
                          workOrder.createdAt,
                          workOrder.completedAt,
                        )}
                      </span>
                    </div>

                    <div className="mt-3 d-flex gap-2 flex-wrap">
                      <Link
                        to={`/service/customers/${workOrder.customer.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Müşteri Detayı
                      </Link>

                      <Link
                        to={`/service/vehicles/${workOrder.vehicle.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Araç Detayı
                      </Link>
                    </div>
                  </div>
                </div>

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
                            setEditForm({
                              ...editForm,
                              mileage: e.target.value,
                            })
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
                            setEditForm({
                              ...editForm,
                              laborCost: e.target.value,
                            })
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
                            setEditForm({
                              ...editForm,
                              partsCost: e.target.value,
                            })
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
                  <div className="mt-3">
                    <h6 style={{ color: "#18265a", fontWeight: 800 }}>
                      Açıklama
                    </h6>

                    <p className="text-muted mb-0">
                      {workOrder.description || "Açıklama eklenmemiş."}
                    </p>

                    <div className="mt-3 d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => handleStatusChange("Pending")}
                      >
                        Bekliyor
                      </button>

                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleStatusChange("InProgress")}
                      >
                        İşlemde
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleStatusChange("Completed")}
                      >
                        Tamamlandı
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                background:
                  "linear-gradient(110deg, #fff5de 67%, #fffdf6 100%)",
              }}
            >
              <div className="card-body">
                <div className="text-muted small">Toplam Tutar</div>

                <div className="h3 fw-bold mb-3" style={{ color: "#b78b16" }}>
                  ₺{Number(workOrder.totalCost || 0).toLocaleString("tr-TR")}
                </div>

                <div className="d-grid gap-2">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">İşçilik</span>
                    <strong>{workOrder.laborCost} ₺</strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Parça</span>
                    <strong>{workOrder.partsCost} ₺</strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Durum</span>
                    <span
                      className={`badge ${getStatusClass(workOrder.status)}`}
                    >
                      {getStatusText(workOrder.status)}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Süre</span>
                    <strong>
                      {getWorkDuration(
                        workOrder.createdAt,
                        workOrder.completedAt,
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ServiceWorkOrderDetailPage;
