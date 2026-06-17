import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import {
  getCustomerVehicles,
  createCustomerVehicle,
  updateCustomerVehicle,
  deleteCustomerVehicle,
} from "../services/customerVehicleService";

import { getCustomers } from "../services/serviceCustomerService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [vehiclesData, customersData] = await Promise.all([
        getCustomerVehicles(),
        getCustomers(),
      ]);

      setVehicles(vehiclesData);
      setCustomers(customersData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Araçlar yüklenemedi.");
      toast.error("Araçlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
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

    try {
      const createdVehicle = await createCustomerVehicle({
        ...form,
        serviceCustomerId: Number(form.serviceCustomerId),
        year: Number(form.year),
        currentMileage: Number(form.currentMileage),
      });

      setVehicles([createdVehicle, ...vehicles]);
      resetForm();
      toast.success("Araç eklendi.");
    } catch (err) {
      console.error(err);
      toast.error("Araç eklenemedi.");
    }
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

    try {
      const updatedVehicle = await updateCustomerVehicle(id, {
        ...editForm,
        serviceCustomerId: Number(editForm.serviceCustomerId),
        year: Number(editForm.year),
        currentMileage: Number(editForm.currentMileage),
      });

      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle,
        ),
      );

      cancelEdit();
      toast.success("Araç güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Araç güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu aracı silmek istediğine emin misin?");

    if (!confirmed) return;

    try {
      await deleteCustomerVehicle(id);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      toast.success("Araç silindi.");
    } catch (error) {
      toast.error(
        error.response?.data ||
          "Araç silinemedi. Bu araca bağlı iş emri olabilir.",
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

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Araçlar yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="🚗"
          title="Araçlar"
          subtitle="Servise kayıtlı araçları yönetin."
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <div className="card border-0 shadow-sm p-3 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search" />
            </span>

            <input
              className="form-control"
              placeholder="Araç, plaka veya müşteri ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-3">
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
              Yeni Araç
            </h5>
            <small className="text-muted">
              Müşteriye ait aracı servise hızlıca kaydedin.
            </small>
          </div>

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
              <button className="btn btn-primary w-100">
                <i className="bi bi-plus-circle me-1" />
                Araç Ekle
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              Araç Listesi
            </h5>

            <span className="badge bg-light text-dark border">
              {filteredVehicles.length} kayıt
            </span>
          </div>

          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="vehicle-card-hover card border-0 shadow-sm mb-3"
            >
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
                        <button className="btn btn-success w-100">
                          Kaydet
                        </button>

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
                  <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                    <div className="d-flex gap-3 align-items-start">
                      <div
                        className="d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 16,
                          background:
                            "linear-gradient(135deg, #1a906c, #47c172)",
                          boxShadow: "0 10px 22px rgba(71, 193, 114, .22)",
                        }}
                      >
                        <i className="bi bi-car-front" />
                      </div>

                      <div>
                        <h5
                          className="mb-1"
                          style={{ color: "#18265a", fontWeight: 800 }}
                        >
                          {vehicle.brand} {vehicle.model}
                        </h5>

                        <div className="text-muted small mb-2">
                          <i className="bi bi-person me-1" />
                          {vehicle.customerName}
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-credit-card-2-front me-1" />
                            {vehicle.plate}
                          </span>

                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-speedometer2 me-1" />
                            {vehicle.currentMileage} KM
                          </span>

                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-calendar me-1" />
                            {vehicle.year || "Yıl yok"}
                          </span>

                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-upc-scan me-1" />
                            {vehicle.chassisNumber || "Şasi yok"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
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
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredVehicles.length === 0 && (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 36 }}>🚗</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                Araç bulunamadı
              </h5>
              <p className="text-muted mb-0">
                Arama kriterlerine uygun araç yok veya henüz araç eklenmemiş.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .vehicle-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .vehicle-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #f5fff9 88%, #e8f8ef 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceVehiclesPage;