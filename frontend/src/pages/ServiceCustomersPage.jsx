import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/serviceCustomerService";

import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    note: "",
  });

  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Müşteriler yüklenemedi.");
      toast.error("Müşteriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      note: "",
    });
  };

  const cancelEdit = () => {
    setEditingCustomerId(null);
    setEditForm({
      fullName: "",
      phone: "",
      note: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdCustomer = await createCustomer(form);
      setCustomers([createdCustomer, ...customers]);
      resetForm();
      toast.success("Müşteri eklendi.");
    } catch (err) {
      console.error(err);
      toast.error("Müşteri eklenemedi.");
    }
  };

  const startEdit = (customer) => {
    setEditingCustomerId(customer.id);

    setEditForm({
      fullName: customer.fullName,
      phone: customer.phone,
      note: customer.note || "",
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const updatedCustomer = await updateCustomer(id, editForm);

      setCustomers(
        customers.map((customer) =>
          customer.id === id ? { ...customer, ...updatedCustomer } : customer,
        ),
      );

      cancelEdit();
      toast.success("Müşteri güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Müşteri güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Bu müşteriyi silmek istediğine emin misin?",
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
      toast.success("Müşteri silindi.");
    } catch (error) {
      toast.error(
        error.response?.data ||
          "Müşteri silinemedi. Bu müşteriye bağlı araç olabilir.",
      );
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      (customer.note || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Müşteriler yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="👥"
          title="Müşteriler"
          subtitle="Servis müşterilerinizi ekleyin, düzenleyin ve yönetin."
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
              placeholder="Ad, telefon veya nota göre müşteri ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-3">
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
              Yeni Müşteri
            </h5>
            <small className="text-muted">
              Servise gelen yeni müşteriyi hızlıca kaydedin.
            </small>
          </div>

          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Ad Soyad"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Not"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100">
                <i className="bi bi-plus-circle me-1" />
                Ekle
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              Müşteri Listesi
            </h5>

            <span className="badge bg-light text-dark border">
              {filteredCustomers.length} kayıt
            </span>
          </div>

          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="customer-card-hover card border-0 shadow-sm mb-3"
            >
              <div className="card-body">
                {editingCustomerId === customer.id ? (
                  <form onSubmit={(e) => handleUpdate(e, customer.id)}>
                    <div className="row g-2 align-items-center">
                      <div className="col-md-4">
                        <input
                          className="form-control"
                          value={editForm.fullName}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <input
                          className="form-control"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-3">
                        <input
                          className="form-control"
                          value={editForm.note}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              note: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-2 d-flex gap-2">
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
                            "linear-gradient(135deg, #18265a, #3b60c5)",
                          boxShadow: "0 10px 22px rgba(59, 96, 197, .22)",
                        }}
                      >
                        {customer.fullName?.charAt(0)?.toUpperCase() || "M"}
                      </div>

                      <div>
                        <h5
                          className="mb-1"
                          style={{ color: "#18265a", fontWeight: 800 }}
                        >
                          {customer.fullName}
                        </h5>

                        <div className="text-muted small mb-2">
                          <i className="bi bi-telephone me-1" />
                          {customer.phone || "Telefon yok"}
                        </div>

                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-chat-left-text me-1" />
                          {customer.note || "Not eklenmemiş"}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <Link
                        to={`/service/customers/${customer.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Detay
                      </Link>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => startEdit(customer)}
                      >
                        Düzenle
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 36 }}>👥</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                Müşteri bulunamadı
              </h5>
              <p className="text-muted mb-0">
                Arama kriterlerine uygun müşteri yok veya henüz müşteri
                eklenmemiş.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .customer-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .customer-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #f5f9ff 88%, #e8f1fd 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceCustomersPage;