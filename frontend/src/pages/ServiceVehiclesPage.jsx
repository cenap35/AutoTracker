import { useEffect, useState } from "react";
import {
  getCustomerVehicles,
  createCustomerVehicle,
} from "../services/customerVehicleService";
import { getCustomers } from "../services/serviceCustomerService";

function ServiceVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    serviceCustomerId: "",
    brand: "",
    model: "",
    year: "",
    plate: "",
    currentMileage: "",
    chassisNumber: "",
  });

  useEffect(() => {
    loadVehicles();
    loadCustomers();
  }, []);

  const loadVehicles = async () => {
    const data = await getCustomerVehicles();
    setVehicles(data);
  };

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdVehicle = await createCustomerVehicle({
      ...form,
      serviceCustomerId: Number(form.serviceCustomerId),
      year: Number(form.year),
      currentMileage: Number(form.currentMileage),
    });

    setVehicles([createdVehicle, ...vehicles]);

    setForm({
      serviceCustomerId: "",
      brand: "",
      model: "",
      year: "",
      plate: "",
      currentMileage: "",
      chassisNumber: "",
    });
  };

  return (
    <div>
      <h2>Araçlar</h2>

      <form onSubmit={handleSubmit} className="card p-3 mt-3">
        <div className="row g-2">
          <div className="col-md-4">
            <select
              className="form-select"
              value={form.serviceCustomerId}
              onChange={(e) =>
                setForm({ ...form, serviceCustomerId: e.target.value })
              }
              required
            >
              <option value="">Müşteri seç</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.fullName} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Marka"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Yıl"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Plaka"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Kilometre"
              value={form.currentMileage}
              onChange={(e) =>
                setForm({ ...form, currentMileage: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Şasi No"
              value={form.chassisNumber}
              onChange={(e) =>
                setForm({ ...form, chassisNumber: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary w-100">Araç Ekle</button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card mb-3">
            <div className="card-body">
              <h5>
                {vehicle.brand} {vehicle.model}
              </h5>

              <p className="mb-1">
                <strong>Plaka:</strong> {vehicle.plate}
              </p>

              <p className="mb-1">
                <strong>Müşteri:</strong> {vehicle.customerName}
              </p>

              <p className="mb-0">
                <strong>KM:</strong> {vehicle.currentMileage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceVehiclesPage;