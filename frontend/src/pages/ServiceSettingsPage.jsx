import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

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
  const [error, setError] = useState("");

  useEffect(() => {
    loadServiceBusiness();
  }, []);

  const loadServiceBusiness = async () => {
    try {
      setLoading(true);

      const data = await getMyServiceBusiness();

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        city: data.city || "",
        address: data.address || "",
      });

      setError("");
    } catch (err) {
      console.error(err);
      setError("Servis bilgileri yüklenemedi.");
      toast.error("Servis bilgileri yüklenemedi.");
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
      setError("");
      toast.success("Servis bilgileri güncellendi.");
    } catch (err) {
      console.error(err);
      setError("Servis bilgileri güncellenemedi.");
      setMessage("");
      toast.error("Servis bilgileri güncellenemedi.");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Servis bilgileri yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="⚙️"
          title="Servis Bilgileri"
          subtitle="Servis profil bilgilerinizi güncelleyin."
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        {message && (
          <div className="alert alert-success shadow-sm rounded-3">
            <i className="bi bi-check-circle me-2" />
            {message}
          </div>
        )}

        <div className="row g-3">
          <div className="col-lg-8">
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm p-3"
            >
              <div className="mb-3">
                <h5
                  className="mb-1"
                  style={{ color: "#18265a", fontWeight: 800 }}
                >
                  Profil Bilgileri
                </h5>
                <small className="text-muted">
                  Servis adınızı, iletişim bilgilerinizi ve adresinizi
                  güncelleyin.
                </small>
              </div>

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
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              <button className="btn btn-primary">
                <i className="bi bi-save me-1" />
                Kaydet
              </button>
            </form>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                background:
                  "linear-gradient(110deg, #eaf2ff 60%, #eff5fc 100%)",
              }}
            >
              <div className="card-body">
                <div
                  className="d-flex align-items-center justify-content-center text-white mb-3"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #18265a, #3b60c5)",
                    boxShadow: "0 10px 22px rgba(59, 96, 197, .22)",
                  }}
                >
                  <i className="bi bi-building fs-4" />
                </div>

                <h5 style={{ color: "#18265a", fontWeight: 850 }}>
                  {form.name || "Servis Adı"}
                </h5>

                <div className="text-muted small mb-2">
                  <i className="bi bi-telephone me-1" />
                  {form.phone || "Telefon yok"}
                </div>

                <div className="text-muted small mb-2">
                  <i className="bi bi-geo-alt me-1" />
                  {form.city || "Şehir yok"}
                </div>

                <span className="badge bg-light text-dark border">
                  <i className="bi bi-signpost me-1" />
                  {form.address || "Adres yok"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ServiceSettingsPage;