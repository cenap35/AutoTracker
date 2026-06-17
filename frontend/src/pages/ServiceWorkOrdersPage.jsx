import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    loadWorkOrders();
    loadVehicles();
  }, []);

  const loadWorkOrders = async () => {
    const data = await getServiceWorkOrders();
    setWorkOrders(data);
  };

  const loadVehicles = async () => {
    const data = await getCustomerVehicles();
    setVehicles(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  const handleQuickStatusChange = async (e, orderId, status) => {
    e.preventDefault();
    e.stopPropagation();

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
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu iş emrini silmek istiyor musun?");

    if (!confirmed) return;

    try {
      await deleteServiceWorkOrder(id);
      setWorkOrders(workOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error(error);
      alert("İş emri silinemedi.");
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

  return (
    <div>
      <ServicePageHeader
        icon="🔧"
        title="İş Emirleri"
        subtitle="Bakım ve onarım süreçlerini takip edin."
      />
      <form onSubmit={handleSubmit} className="card p-3 mt-3">
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
              onChange={(e) => setForm({ ...form, laborCost: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Parça"
              value={form.partsCost}
              onChange={(e) => setForm({ ...form, partsCost: e.target.value })}
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
            <button className="btn btn-primary w-100">Ekle</button>
          </div>
        </div>
      </form>

      <div className="card p-3 mt-4">
        <div className="row g-2">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="İş emri, müşteri, araç veya plaka ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
        {filteredWorkOrders.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h5>{order.title}</h5>

                  <p className="mb-1">
                    <strong>Müşteri:</strong> {order.customerName}
                  </p>

                  <p className="mb-1">
                    <strong>Araç:</strong> {order.vehicleName} - {order.plate}
                  </p>

                  <p className="mb-1">
                    <strong>Durum:</strong>{" "}
                    <span className={`badge ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </p>

                  <p className="mb-0">
                    <strong>Tutar:</strong> {order.totalCost} ₺
                  </p>
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
          <p className="text-muted">İş emri bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceWorkOrdersPage;
