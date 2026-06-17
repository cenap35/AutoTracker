import { useEffect, useState } from "react";
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

  const [form, setForm] = useState({
    customerVehicleId: "",
    title: "",
    description: "",
    mileage: "",
    laborCost: "",
    partsCost: "",
    status: "Pending",
  });

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

  const getStatusIcon = (status) => {
    if (status === "Pending") return "bi-hourglass-split";
    if (status === "InProgress") return "bi-gear";
    if (status === "Completed") return "bi-check-circle";
    return "bi-circle";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdOrder = await createServiceWorkOrder({
        ...form,
        customerVehicleId: Number(form.customerVehicleId),
        mileage: Number(form.mileage),
        laborCost: Number(form.laborCost),
        partsCost: Number(form.partsCost),
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

        <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-3">
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
                className="form-select"
                value={form.customerVehicleId}
                onChange={(e) =>
                  setForm({ ...form, customerVehicleId: e.target.value })
                }
                required
              >
                <option value="">Araç seç</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.customerName} - {vehicle.brand} {vehicle.model} -{" "}
                    {vehicle.plate}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="İşlem başlığı"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Açıklama"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Kilometre"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="İşçilik"
                value={form.laborCost}
                onChange={(e) =>
                  setForm({ ...form, laborCost: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Parça"
                value={form.partsCost}
                onChange={(e) =>
                  setForm({ ...form, partsCost: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Pending">Bekliyor</option>
                <option value="InProgress">İşlemde</option>
                <option value="Completed">Tamamlandı</option>
              </select>
            </div>

            <div className="col-md-1">
              <button className="btn btn-primary w-100">
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
                        background:
                          "linear-gradient(135deg, #b78b16, #ffb703)",
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
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceWorkOrdersPage;