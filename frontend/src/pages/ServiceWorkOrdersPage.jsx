import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import {
  getServiceWorkOrders,
  createServiceWorkOrder,
  updateWorkOrderStatus,
  deleteServiceWorkOrder,
} from "../services/serviceWorkOrderService";

import { getCustomerVehicles } from "../services/customerVehicleService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceWorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    customerVehicleId: "",
    title: "",
    description: "",
    mileage: "",
    laborCost: "",
    partsCost: "",
    status: "Pending",
  });

  const validateWorkOrder = (data) => {
    return {
      customerVehicleId: !data.customerVehicleId
        ? "Araç seçimi zorunludur."
        : "",

      title: !data.title.trim()
        ? "İş emri başlığı zorunludur."
        : data.title.trim().length < 3
          ? "Başlık en az 3 karakter olmalı."
          : data.title.trim().length > 100
            ? "Başlık en fazla 100 karakter olabilir."
            : "",

      description:
        data.description.trim().length > 500
          ? "Açıklama en fazla 500 karakter olabilir."
          : "",

      mileage:
        data.mileage &&
        (Number(data.mileage) < 0 || Number(data.mileage) > 2000000)
          ? "Kilometre 0 ile 2.000.000 arasında olmalı."
          : "",

      laborCost:
        data.laborCost === ""
          ? "İşçilik tutarı zorunludur."
          : Number(data.laborCost) < 0 || Number(data.laborCost) > 1000000
            ? "İşçilik 0 ile 1.000.000 arasında olmalı."
            : "",

      partsCost:
        data.partsCost === ""
          ? "Parça tutarı zorunludur."
          : Number(data.partsCost) < 0 || Number(data.partsCost) > 1000000
            ? "Parça tutarı 0 ile 1.000.000 arasında olmalı."
            : "",

      status: !["Pending", "InProgress", "Completed"].includes(data.status)
        ? "Geçerli bir durum seçiniz."
        : "",
    };
  };

  const formErrors = useMemo(() => validateWorkOrder(form), [form]);

  const isFormValid = Object.values(formErrors).every((err) => !err);

  const shouldShowError = (field) => submitted && formErrors[field];

  const getInputClass = (field) =>
    `form-control ${shouldShowError(field) ? "is-invalid" : ""}`;

  const getSelectClass = (field) =>
    `form-select ${shouldShowError(field) ? "is-invalid" : ""}`;

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [ordersData, vehiclesData] = await Promise.all([
        getServiceWorkOrders(),
        getCustomerVehicles(),
      ]);

      setWorkOrders(ordersData);
      setVehicles(vehiclesData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("İş emirleri yüklenemedi.");
      toast.error("İş emirleri yüklenemedi.");
    } finally {
      setLoading(false);
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

    const diffMs = new Date(completedAt) - new Date(createdAt);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      toast.warning("Lütfen iş emri bilgilerini kontrol et.");
      return;
    }

    try {
      const createdOrder = await createServiceWorkOrder({
        customerVehicleId: Number(form.customerVehicleId),
        title: form.title.trim(),
        description: form.description.trim(),
        mileage: form.mileage ? Number(form.mileage) : 0,
        laborCost: Number(form.laborCost),
        partsCost: Number(form.partsCost),
        status: form.status,
      });

      setWorkOrders([createdOrder, ...workOrders]);

      setForm({
        customerVehicleId: "",
        title: "",
        description: "",
        mileage: "",
        laborCost: "",
        partsCost: "",
        status: "Pending",
      });

      setSubmitted(false);
      toast.success("İş emri oluşturuldu.");
    } catch (err) {
      console.error(err);
      toast.error("İş emri oluşturulamadı.");
    }
  };

  const handleQuickStatusChange = async (e, orderId, status) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await updateWorkOrderStatus(orderId, status);

      setWorkOrders(
        workOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: result.status,
                completedAt: result.completedAt,
              }
            : order,
        ),
      );

      toast.success("İş emri durumu güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Durum güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu iş emrini silmek istiyor musun?");

    if (!confirmed) return;

    try {
      await deleteServiceWorkOrder(id);
      setWorkOrders(workOrders.filter((order) => order.id !== id));
      toast.success("İş emri silindi.");
    } catch (error) {
      console.error(error);
      toast.error("İş emri silinemedi.");
    }
  };

  const filteredWorkOrders = workOrders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      order.title.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.vehicleName.toLowerCase().includes(search) ||
      order.plate.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="İş emirleri yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="🔧"
          title="İş Emirleri"
          subtitle="Bakım ve onarım süreçlerini takip edin."
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card border-0 shadow-sm p-3"
        >
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
              Yeni İş Emri
            </h5>
            <small className="text-muted">
              Araç için bakım, onarım veya servis işlemi oluşturun.
            </small>
          </div>

          <div className="row g-2">
            <div className="col-md-4">
              <select
                className={getSelectClass("customerVehicleId")}
                value={form.customerVehicleId}
                onChange={(e) =>
                  setForm({ ...form, customerVehicleId: e.target.value })
                }
              >
                <option value="">Araç seç</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.customerName} - {vehicle.brand} {vehicle.model} -{" "}
                    {vehicle.plate}
                  </option>
                ))}
              </select>

              {shouldShowError("customerVehicleId") && (
                <div className="invalid-feedback d-block">
                  {formErrors.customerVehicleId}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <input
                className={getInputClass("title")}
                placeholder="İşlem başlığı"
                value={form.title}
                maxLength={100}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              {shouldShowError("title") && (
                <div className="invalid-feedback d-block">
                  {formErrors.title}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <input
                className={getInputClass("description")}
                placeholder="Açıklama"
                value={form.description}
                maxLength={500}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="d-flex justify-content-between mt-1">
                <div>
                  {shouldShowError("description") && (
                    <div className="invalid-feedback d-block">
                      {formErrors.description}
                    </div>
                  )}
                </div>

                <small className="text-muted">
                  {form.description.length}/500
                </small>
              </div>
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className={getInputClass("mileage")}
                placeholder="Kilometre"
                value={form.mileage}
                min="0"
                max="2000000"
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
              />

              {shouldShowError("mileage") && (
                <div className="invalid-feedback d-block">
                  {formErrors.mileage}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className={getInputClass("laborCost")}
                placeholder="İşçilik"
                value={form.laborCost}
                min="0"
                max="1000000"
                onChange={(e) =>
                  setForm({ ...form, laborCost: e.target.value })
                }
              />

              {shouldShowError("laborCost") && (
                <div className="invalid-feedback d-block">
                  {formErrors.laborCost}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className={getInputClass("partsCost")}
                placeholder="Parça"
                value={form.partsCost}
                min="0"
                max="1000000"
                onChange={(e) =>
                  setForm({ ...form, partsCost: e.target.value })
                }
              />

              {shouldShowError("partsCost") && (
                <div className="invalid-feedback d-block">
                  {formErrors.partsCost}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <select
                className={getSelectClass("status")}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Pending">Bekliyor</option>
                <option value="InProgress">İşlemde</option>
                <option value="Completed">Tamamlandı</option>
              </select>

              {shouldShowError("status") && (
                <div className="invalid-feedback d-block">
                  {formErrors.status}
                </div>
              )}
            </div>

            <div className="col-md-1">
              <button className="btn btn-primary w-100" disabled={!isFormValid}>
                <i className="bi bi-plus-circle" />
              </button>
            </div>
          </div>
        </form>

        <div className="card border-0 shadow-sm p-3 mt-4">
          <div className="row g-2">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search" />
                </span>

                <input
                  className="form-control"
                  placeholder="İş emri, müşteri, araç veya plaka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Tüm durumlar</option>
                <option value="Pending">Bekliyor</option>
                <option value="InProgress">İşlemde</option>
                <option value="Completed">Tamamlandı</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              İş Emri Listesi
            </h5>

            <span className="badge bg-light text-dark border">
              {filteredWorkOrders.length} kayıt
            </span>
          </div>

          {filteredWorkOrders.map((order) => (
            <div
              key={order.id}
              className="workorder-card-hover card border-0 shadow-sm mb-3"
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #b78b16, #ffb703)",
                        boxShadow: "0 10px 22px rgba(255, 183, 3, .22)",
                      }}
                    >
                      <i className={`bi ${getStatusIcon(order.status)}`} />
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <h5
                          className="mb-0"
                          style={{ color: "#18265a", fontWeight: 800 }}
                        >
                          {order.title}
                        </h5>

                        <span
                          className={`badge ${getStatusClass(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      <div className="text-muted small mb-2">
                        <i className="bi bi-person me-1" />
                        {order.customerName}
                      </div>

                      <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-car-front me-1" />
                          {order.vehicleName}
                        </span>

                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-credit-card-2-front me-1" />
                          {order.plate}
                        </span>

                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-cash-coin me-1" />
                          {order.totalCost} ₺
                        </span>

                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-clock me-1" />
                          {formatDateTime(order.createdAt)}
                        </span>

                        {order.completedAt && (
                          <>
                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-check2-circle me-1" />
                              Tamamlandı: {formatDateTime(order.completedAt)}
                            </span>

                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-hourglass-split me-1" />
                              Süre:{" "}
                              {getWorkDuration(
                                order.createdAt,
                                order.completedAt,
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <Link
                      to={`/service/work-orders/${order.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Detay
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={(e) =>
                        handleQuickStatusChange(e, order.id, "Pending")
                      }
                    >
                      Bekliyor
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) =>
                        handleQuickStatusChange(e, order.id, "InProgress")
                      }
                    >
                      İşlemde
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={(e) =>
                        handleQuickStatusChange(e, order.id, "Completed")
                      }
                    >
                      Tamamlandı
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredWorkOrders.length === 0 && (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 36 }}>🔧</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                İş emri bulunamadı
              </h5>
              <p className="text-muted mb-0">
                Arama veya filtre kriterlerine uygun iş emri yok.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .workorder-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .workorder-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #fffaf0 88%, #fff3d6 100%);
            transform: translateY(-2px) scale(1.017);
          }
            .btn:disabled {
            opacity: .40;
            cursor: not-allowed;
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceWorkOrdersPage;
