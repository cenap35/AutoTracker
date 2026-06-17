import { useEffect, useState } from "react";
import {
  getMyServiceBusiness,
  updateMyServiceBusiness,
} from "../services/serviceBusinessService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceSettingsPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadServiceBusiness();
  }, []);

  const loadServiceBusiness = async () => {
    try {
      const data = await getMyServiceBusiness();

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        city: data.city || "",
        address: data.address || "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Servis bilgileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await updateMyServiceBusiness(form);

      setForm({
        name: updated.name || "",
        phone: updated.phone || "",
        city: updated.city || "",
        address: updated.address || "",
      });

      setMessage("Servis bilgileri güncellendi.");
    } catch (error) {
      console.error(error);
      setMessage("Servis bilgileri güncellenemedi.");
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <ServicePageHeader
        icon="⚙️"
        title="Servis Bilgileri"
        subtitle="Servis profil bilgilerinizi güncelleyin."
      />

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mt-3">
        <div className="mb-3">
          <label className="form-label">Servis Adı</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefon</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Şehir</label>
          <input
            className="form-control"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Adres</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <button className="btn btn-primary">Kaydet</button>
      </form>
    </div>
  );
}

export default ServiceSettingsPage;
