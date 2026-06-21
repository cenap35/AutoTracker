import { useEffect, useMemo, useState } from "react";
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
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadServiceBusiness();
  }, []);

  const errors = useMemo(() => {
    const phoneRegex = /^[0-9+\-\s()]+$/;

    return {
      name: !form.name.trim()
        ? "Servis adı zorunludur."
        : form.name.trim().length < 3
          ? "Servis adı en az 3 karakter olmalı."
          : form.name.trim().length > 100
            ? "Servis adı en fazla 100 karakter olabilir."
            : "",

      phone: !form.phone.trim()
        ? "Telefon zorunludur."
        : form.phone.trim().length < 10
          ? "Telefon en az 10 karakter olmalı."
          : form.phone.trim().length > 20
            ? "Telefon en fazla 20 karakter olabilir."
            : !phoneRegex.test(form.phone.trim())
              ? "Telefon sadece rakam, boşluk, +, -, ( ) içerebilir."
              : "",

      city: !form.city.trim()
        ? "Şehir zorunludur."
        : form.city.trim().length < 2
          ? "Şehir en az 2 karakter olmalı."
          : form.city.trim().length > 50
            ? "Şehir en fazla 50 karakter olabilir."
            : "",

      address: !form.address.trim()
        ? "Adres zorunludur."
        : form.address.trim().length < 5
          ? "Adres en az 5 karakter olmalı."
          : form.address.trim().length > 250
            ? "Adres en fazla 250 karakter olabilir."
            : "",
    };
  }, [form]);

  const isFormValid = Object.values(errors).every((err) => !err);

  const shouldShowError = (field) => submitted && errors[field];

  const getInputClass = (field) =>
    `form-control ${shouldShowError(field) ? "is-invalid" : ""}`;

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
    setSubmitted(true);

    if (!isFormValid || saving) {
      toast.warning("Lütfen formdaki eksik veya hatalı alanları düzelt.");
      return;
    }

    try {
      setSaving(true);

      const updated = await updateMyServiceBusiness({
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
      });

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
    } finally {
      setSaving(false);
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
              noValidate
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
                  className={getInputClass("name")}
                  value={form.name}
                  maxLength={100}
                  onChange={(e) => updateField("name", e.target.value)}
                />

                {shouldShowError("name") && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Telefon</label>
                <input
                  className={getInputClass("phone")}
                  value={form.phone}
                  maxLength={20}
                  onChange={(e) => {
                    const onlyPhoneChars = e.target.value.replace(
                      /[^0-9+\-\s()]/g,
                      "",
                    );
                    updateField("phone", onlyPhoneChars);
                  }}
                />

                {shouldShowError("phone") && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Şehir</label>
                <input
                  className={getInputClass("city")}
                  value={form.city}
                  maxLength={50}
                  onChange={(e) => updateField("city", e.target.value)}
                />

                {shouldShowError("city") && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Adres</label>
                <textarea
                  className={getInputClass("address")}
                  rows="3"
                  value={form.address}
                  maxLength={250}
                  onChange={(e) => updateField("address", e.target.value)}
                />

                <div className="d-flex justify-content-between mt-1">
                  <div>
                    {shouldShowError("address") && (
                      <div className="invalid-feedback d-block">
                        {errors.address}
                      </div>
                    )}
                  </div>

                  <small className="text-muted">
                    {form.address.length}/250
                  </small>
                </div>
              </div>

              <button
                className="btn btn-primary"
                disabled={!isFormValid || saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save me-1" />
                    Kaydet
                  </>
                )}
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