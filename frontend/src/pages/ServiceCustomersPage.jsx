import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const data = await getCustomers();
    setCustomers(data);
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

    const createdCustomer = await createCustomer(form);

    setCustomers([createdCustomer, ...customers]);
    resetForm();
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

    const updatedCustomer = await updateCustomer(id, editForm);

    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );

    cancelEdit();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Bu müşteriyi silmek istediğine emin misin?"
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      alert(
        error.response?.data ||
          "Müşteri silinemedi. Bu müşteriye bağlı araç olabilir."
      );
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      (customer.note || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ServicePageHeader
  icon="👥"
  title="Müşteriler"
  subtitle="Servis müşterilerinizi ekleyin, düzenleyin ve yönetin."
/>

      <input
        className="form-control mt-3"
        placeholder="Müşteri ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="card p-3 mt-3">
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
            <button className="btn btn-primary w-100">Ekle</button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card mb-3">
            <div className="card-body">
              {editingCustomerId === customer.id ? (
                <form onSubmit={(e) => handleUpdate(e, customer.id)}>
                  <div className="row g-2">
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
                  <h5>{customer.fullName}</h5>
                  <p className="mb-1">{customer.phone}</p>
                  <small className="text-muted">{customer.note}</small>

                  <div className="mt-3 d-flex gap-2">
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
                </>
              )}
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <p className="text-muted">Müşteri bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceCustomersPage;