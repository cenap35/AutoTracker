import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getServiceWorkOrders,
  createServiceWorkOrder,
} from "../services/serviceWorkOrderService";
import { getCustomerVehicles } from "../services/customerVehicleService";

function ServiceWorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);

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

  return (
    <div>
      <h2>İş Emirleri</h2>

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

      <div className="mt-4">
        {workOrders.map((order) => (
          <Link
            key={order.id}
            to={`/service/work-orders/${order.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="card mb-3">
              <div className="card-body">
                <h5>{order.title}</h5>

                <p className="mb-1">
                  <strong>Müşteri:</strong> {order.customerName}
                </p>

                <p className="mb-1">
                  <strong>Araç:</strong> {order.vehicleName} - {order.plate}
                </p>

                <p className="mb-1">
                  <strong>Durum:</strong> {order.status}
                </p>

                <p className="mb-0">
                  <strong>Tutar:</strong> {order.totalCost} ₺
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServiceWorkOrdersPage;
