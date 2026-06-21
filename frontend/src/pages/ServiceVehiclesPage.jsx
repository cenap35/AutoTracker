import { useEffect, useMemo, useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);

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

  const validateVehicle = (data) => {
    const currentYear = new Date().getFullYear();

    return {
      serviceCustomerId: !data.serviceCustomerId
        ? "Müşteri seçimi zorunludur."
        : "",

      brand: !data.brand.trim()
        ? "Marka zorunludur."
        : data.brand.trim().length < 2
          ? "Marka en az 2 karakter olmalı."
          : data.brand.trim().length > 50
            ? "Marka en fazla 50 karakter olabilir."
            : "",

      model: !data.model.trim()
        ? "Model zorunludur."
        : data.model.trim().length > 50
          ? "Model en fazla 50 karakter olabilir."
          : "",

      year:
        data.year &&
        (Number(data.year) < 1900 || Number(data.year) > currentYear + 1)
          ? `Yıl 1900 ile ${currentYear + 1} arasında olmalı.`
          : "",

      plate: !data.plate.trim()
        ? "Plaka zorunludur."
        : data.plate.trim().length < 5
          ? "Plaka en az 5 karakter olmalı."
          : data.plate.trim().length > 20
            ? "Plaka en fazla 20 karakter olabilir."
            : "",

      currentMileage:
        data.currentMileage &&
        (Number(data.currentMileage) < 0 ||
          Number(data.currentMileage) > 2000000)
          ? "Kilometre 0 ile 2.000.000 arasında olmalı."
          : "",

      chassisNumber:
        data.chassisNumber.trim().length > 50
          ? "Şasi no en fazla 50 karakter olabilir."
          : "",
    };
  };

  const formErrors = useMemo(() => validateVehicle(form), [form]);
  const editErrors = useMemo(() => validateVehicle(editForm), [editForm]);

  const isFormValid = Object.values(formErrors).every((err) => !err);
  const isEditFormValid = Object.values(editErrors).every((err) => !err);

  const shouldShowError = (field) => submitted && formErrors[field];
  const shouldShowEditError = (field) => editSubmitted && editErrors[field];

  const getInputClass = (field) =>
    `form-control ${shouldShowError(field) ? "is-invalid" : ""}`;

  const getSelectClass = (field) =>
    `form-select ${shouldShowError(field) ? "is-invalid" : ""}`;

  const getEditInputClass = (field) =>
    `form-control ${shouldShowEditError(field) ? "is-invalid" : ""}`;

  const getEditSelectClass = (field) =>
    `form-select ${shouldShowEditError(field) ? "is-invalid" : ""}`;

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
    setSubmitted(false);
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
    setEditSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      toast.warning("Lütfen araç bilgilerini kontrol et.");
      return;
    }

    try {
      const createdVehicle = await createCustomerVehicle({
        serviceCustomerId: Number(form.serviceCustomerId),
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: form.year ? Number(form.year) : null,
        plate: form.plate.trim().toUpperCase(),
        currentMileage: form.currentMileage ? Number(form.currentMileage) : 0,
        chassisNumber: form.chassisNumber.trim().toUpperCase(),
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
      serviceCustomerId: vehicle.serviceCustomerId || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      year: vehicle.year || "",
      plate: vehicle.plate || "",
      currentMileage: vehicle.currentMileage ?? "",
      chassisNumber: vehicle.chassisNumber || "",
    });

    setEditSubmitted(false);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setEditSubmitted(true);

    if (!isEditFormValid) {
      toast.warning("Lütfen araç bilgilerini kontrol et.");
      return;
    }

    try {
      const updatedVehicle = await updateCustomerVehicle(id, {
        serviceCustomerId: Number(editForm.serviceCustomerId),
        brand: editForm.brand.trim(),
        model: editForm.model.trim(),
        year: editForm.year ? Number(editForm.year) : null,
        plate: editForm.plate.trim().toUpperCase(),
        currentMileage: editForm.currentMileage
          ? Number(editForm.currentMileage)
          : 0,
        chassisNumber: editForm.chassisNumber.trim().toUpperCase(),
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

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card border-0 shadow-sm p-3"
        >
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
                className={getSelectClass("serviceCustomerId")}
                value={form.serviceCustomerId}
                onChange={(e) =>
                  setForm({ ...form, serviceCustomerId: e.target.value })
                }
              >
                <option value="">Müşteri seç</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.fullName} - {customer.phone}
                  </option>
                ))}
              </select>

              {shouldShowError("serviceCustomerId") && (
                <div className="invalid-feedback d-block">
                  {formErrors.serviceCustomerId}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                className={getInputClass("brand")}
                placeholder="Marka"
                value={form.brand}
                maxLength={50}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />

              {shouldShowError("brand") && (
                <div className="invalid-feedback d-block">
                  {formErrors.brand}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                className={getInputClass("model")}
                placeholder="Model"
                value={form.model}
                maxLength={50}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />

              {shouldShowError("model") && (
                <div className="invalid-feedback d-block">
                  {formErrors.model}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getInputClass("year")}
                placeholder="Yıl"
                value={form.year}
                min="1900"
                max={new Date().getFullYear() + 1}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />

              {shouldShowError("year") && (
                <div className="invalid-feedback d-block">
                  {formErrors.year}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                className={getInputClass("plate")}
                placeholder="Plaka"
                value={form.plate}
                maxLength={20}
                onChange={(e) =>
                  setForm({ ...form, plate: e.target.value.toUpperCase() })
                }
              />

              {shouldShowError("plate") && (
                <div className="invalid-feedback d-block">
                  {formErrors.plate}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className={getInputClass("currentMileage")}
                placeholder="Kilometre"
                value={form.currentMileage}
                min="0"
                max="2000000"
                onChange={(e) =>
                  setForm({ ...form, currentMileage: e.target.value })
                }
              />

              {shouldShowError("currentMileage") && (
                <div className="invalid-feedback d-block">
                  {formErrors.currentMileage}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <input
                className={getInputClass("chassisNumber")}
                placeholder="Şasi No"
                value={form.chassisNumber}
                maxLength={50}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chassisNumber: e.target.value.toUpperCase(),
                  })
                }
              />

              {shouldShowError("chassisNumber") && (
                <div className="invalid-feedback d-block">
                  {formErrors.chassisNumber}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100" disabled={!isFormValid}>
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
                  <form
                    onSubmit={(e) => handleUpdate(e, vehicle.id)}
                    noValidate
                  >
                    <div className="row g-2">
                      <div className="col-md-4">
                        <select
                          className={getEditSelectClass("serviceCustomerId")}
                          value={editForm.serviceCustomerId}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              serviceCustomerId: e.target.value,
                            })
                          }
                        >
                          <option value="">Müşteri seç</option>
                          {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.fullName} - {customer.phone}
                            </option>
                          ))}
                        </select>

                        {shouldShowEditError("serviceCustomerId") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.serviceCustomerId}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          className={getEditInputClass("brand")}
                          placeholder="Marka"
                          value={editForm.brand}
                          maxLength={50}
                          onChange={(e) =>
                            setEditForm({ ...editForm, brand: e.target.value })
                          }
                        />

                        {shouldShowEditError("brand") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.brand}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          className={getEditInputClass("model")}
                          placeholder="Model"
                          value={editForm.model}
                          maxLength={50}
                          onChange={(e) =>
                            setEditForm({ ...editForm, model: e.target.value })
                          }
                        />

                        {shouldShowEditError("model") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.model}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className={getEditInputClass("year")}
                          placeholder="Yıl"
                          value={editForm.year}
                          min="1900"
                          max={new Date().getFullYear() + 1}
                          onChange={(e) =>
                            setEditForm({ ...editForm, year: e.target.value })
                          }
                        />

                        {shouldShowEditError("year") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.year}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          className={getEditInputClass("plate")}
                          placeholder="Plaka"
                          value={editForm.plate}
                          maxLength={20}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              plate: e.target.value.toUpperCase(),
                            })
                          }
                        />

                        {shouldShowEditError("plate") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.plate}
                          </div>
                        )}
                      </div>

                      <div className="col-md-3">
                        <input
                          type="number"
                          className={getEditInputClass("currentMileage")}
                          placeholder="Kilometre"
                          value={editForm.currentMileage}
                          min="0"
                          max="2000000"
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              currentMileage: e.target.value,
                            })
                          }
                        />

                        {shouldShowEditError("currentMileage") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.currentMileage}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <input
                          className={getEditInputClass("chassisNumber")}
                          placeholder="Şasi No"
                          value={editForm.chassisNumber}
                          maxLength={50}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              chassisNumber: e.target.value.toUpperCase(),
                            })
                          }
                        />

                        {shouldShowEditError("chassisNumber") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.chassisNumber}
                          </div>
                        )}
                      </div>

                      <div className="col-md-3 d-flex gap-2">
                        <button
                          className="btn btn-success w-100"
                          disabled={!isEditFormValid}
                        >
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

    .btn:disabled {
      opacity: .55;
      cursor: not-allowed;
    }
  `}
      </style>
    </PageWrapper>
  );
}

export default ServiceVehiclesPage;
