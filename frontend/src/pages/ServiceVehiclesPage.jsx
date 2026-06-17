import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomerVehicles,
  createCustomerVehicle,
  updateCustomerVehicle,
  deleteCustomerVehicle,
} from "../services/customerVehicleService";
import { getCustomers } from "../services/serviceCustomerService";

function ServiceVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const [form, setForm] = useState({
    serviceCustomerId: "",
    brand: "",
    model: "",
    year: "",
    plate: "",
    currentMileage: "",
    chassisNumber: "",
  });

  const [editForm, setEditForm] = useState({
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

  const resetForm = () => {
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

  const cancelEdit = () => {
    setEditingVehicleId(null);

    setEditForm({
      serviceCustomerId: "",
      brand: "",
      model: "",
      year: "",
      plate: "",
      currentMileage: "",
      chassisNumber: "",
    });
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
    resetForm();
  };

  const startEdit = (vehicle) => {
    setEditingVehicleId(vehicle.id);

    setEditForm({
      serviceCustomerId: vehicle.serviceCustomerId,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate,
      currentMileage: vehicle.currentMileage,
      chassisNumber: vehicle.chassisNumber || "",
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const updatedVehicle = await updateCustomerVehicle(id, {
      ...editForm,
      serviceCustomerId: Number(editForm.serviceCustomerId),
      year: Number(editForm.year),
      currentMileage: Number(editForm.currentMileage),
    });

    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
      )
    );

    cancelEdit();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu aracı silmek istediğine emin misin?");

    if (!confirmed) return;

    try {
      await deleteCustomerVehicle(id);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      alert(
        error.response?.data ||
          "Araç silinemedi. Bu araca bağlı iş emri olabilir."
      );
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();

    return (
      vehicle.brand.toLowerCase().includes(search) ||
      vehicle.model.toLowerCase().includes(search) ||
      vehicle.plate.toLowerCase().includes(search) ||
      vehicle.customerName.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h2>Araçlar</h2>

      <input
        className="form-control mt-3"
        placeholder="Araç, plaka veya müşteri ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="card mb-3">
            <div className="card-body">
              {editingVehicleId === vehicle.id ? (
                <form onSubmit={(e) => handleUpdate(e, vehicle.id)}>
                  <div className="row g-2">
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={editForm.serviceCustomerId}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            serviceCustomerId: e.target.value,
                          })
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
                        value={editForm.brand}
                        onChange={(e) =>
                          setEditForm({ ...editForm, brand: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        className="form-control"
                        placeholder="Model"
                        value={editForm.model}
                        onChange={(e) =>
                          setEditForm({ ...editForm, model: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Yıl"
                        value={editForm.year}
                        onChange={(e) =>
                          setEditForm({ ...editForm, year: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        className="form-control"
                        placeholder="Plaka"
                        value={editForm.plate}
                        onChange={(e) =>
                          setEditForm({ ...editForm, plate: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Kilometre"
                        value={editForm.currentMileage}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            currentMileage: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Şasi No"
                        value={editForm.chassisNumber}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            chassisNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-3 d-flex gap-2">
                      <button className="btn btn-success w-100">Kaydet</button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={cancelEdit}
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <h5>
                    {vehicle.brand} {vehicle.model}
                  </h5>

                  <p className="mb-1">
                    <strong>Plaka:</strong> {vehicle.plate}
                  </p>

                  <p className="mb-1">
                    <strong>Müşteri:</strong> {vehicle.customerName}
                  </p>

                  <p className="mb-1">
                    <strong>KM:</strong> {vehicle.currentMileage}
                  </p>

                  <p className="mb-0">
                    <strong>Şasi No:</strong> {vehicle.chassisNumber || "-"}
                  </p>

                  <div className="mt-3 d-flex gap-2">
                    <Link
                      to={`/service/vehicles/${vehicle.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Detay
                    </Link>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => startEdit(vehicle)}
                    >
                      Düzenle
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Sil
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <p className="text-muted">Araç bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceVehiclesPage;