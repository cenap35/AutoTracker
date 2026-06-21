import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";

function ServiceSetupPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

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

  const isFormValid = Object.values(errors).every((error) => !error);

  const shouldShowError = (field) => submitted && errors[field];

  const getInputClass = (field) =>
    `form-control setup-input ${shouldShowError(field) ? "is-invalid" : ""}`;

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
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

      const response = await api.post("/servicebusinesses", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
      });

      localStorage.setItem("role", response.data.role);

      toast.success("Servis hesabı oluşturuldu.");
      navigate("/service/dashboard");
    } catch (error) {
      if (error.response?.status === 400) {
        navigate("/service/dashboard");
        return;
      }

      console.error(error);
      toast.error("Servis oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <div className="service-setup-page">
        <div className="container py-5">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-lg-5">
              <div className="setup-info-card">
                <div className="setup-icon">🔧</div>

                <span className="setup-badge">AutoTracker Service</span>

                <h1>Servis panelinizi birkaç adımda oluşturun.</h1>

                <p>
                  Servis bilgilerinizi ekleyerek müşteri, araç, iş emri, cari
                  takip ve stok yönetimi özelliklerini kullanmaya başlayın.
                </p>

                <div className="setup-check-list">
                  <div>
                    <i className="bi bi-check-circle-fill" />
                    Müşteri ve araç kayıtları
                  </div>

                  <div>
                    <i className="bi bi-check-circle-fill" />
                    İş emri ve servis takibi
                  </div>

                  <div>
                    <i className="bi bi-check-circle-fill" />
                    Cari hesap ve tahsilat yönetimi
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="setup-form-card">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="form-title-icon">
                      <i className="bi bi-building" />
                    </div>

                    <div>
                      <h2 className="mb-1">Servis Bilgileri</h2>
                      <p className="text-muted mb-0">
                        Bu bilgiler servis panelinizin temel profilini
                        oluşturur.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Servis Adı</label>
                      <input
                        className={getInputClass("name")}
                        placeholder="Örn: ABC Oto Servis"
                        value={form.name}
                        maxLength={100}
                        onChange={(e) => updateField("name", e.target.value)}
                      />

                      {shouldShowError("name") && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Telefon</label>
                      <input
                        className={getInputClass("phone")}
                        placeholder="Örn: 05xx xxx xx xx"
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

                    <div className="col-md-12">
                      <label className="form-label">Şehir</label>
                      <input
                        className={getInputClass("city")}
                        placeholder="Örn: Manisa"
                        value={form.city}
                        maxLength={50}
                        onChange={(e) => updateField("city", e.target.value)}
                      />

                      {shouldShowError("city") && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Adres</label>
                      <textarea
                        className={getInputClass("address")}
                        placeholder="Servis adresinizi yazın"
                        rows="4"
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
                  </div>

                  <div className="setup-warning mt-4">
                    <i className="bi bi-info-circle me-2" />
                    Bu bilgileri daha sonra servis ayarları bölümünden
                    güncelleyebilirsiniz.
                  </div>

                  <button
                    className="btn btn-success btn-lg w-100 mt-4"
                    disabled={!isFormValid || saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2" />
                        Servisi Oluştur
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .service-setup-page {
              min-height: calc(100vh - 80px);
              background:
                radial-gradient(circle at top left, rgba(59, 96, 197, .12), transparent 32%),
                linear-gradient(135deg, #f7f9ff 0%, #eef3fb 48%, #ffffff 100%);
            }

            .setup-info-card,
            .setup-form-card {
              border-radius: 28px;
              background: rgba(255, 255, 255, .92);
              border: 1px solid rgba(226, 232, 246, .9);
              box-shadow: 0 24px 60px rgba(24, 38, 90, .12);
            }

            .setup-info-card {
              padding: 36px;
              height: 100%;
              background:
                linear-gradient(135deg, #18265a 0%, #2d4fb2 100%);
              color: white;
            }

            .setup-icon {
              width: 72px;
              height: 72px;
              border-radius: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, .15);
              font-size: 34px;
              margin-bottom: 22px;
            }

            .setup-badge {
              display: inline-flex;
              padding: 8px 12px;
              border-radius: 999px;
              background: rgba(255, 255, 255, .14);
              font-size: 13px;
              font-weight: 800;
              margin-bottom: 18px;
            }

            .setup-info-card h1 {
              font-size: clamp(30px, 4vw, 44px);
              line-height: 1.08;
              font-weight: 900;
              letter-spacing: -1px;
              margin-bottom: 18px;
            }

            .setup-info-card p {
              color: rgba(255, 255, 255, .78);
              line-height: 1.7;
              margin-bottom: 26px;
            }

            .setup-check-list {
              display: grid;
              gap: 12px;
            }

            .setup-check-list div {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 13px 14px;
              border-radius: 16px;
              background: rgba(255, 255, 255, .1);
              font-weight: 700;
            }

            .setup-check-list i {
              color: #7dffbc;
            }

            .setup-form-card {
              padding: 34px;
            }

            .form-title-icon {
              width: 56px;
              height: 56px;
              border-radius: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(59, 96, 197, .1);
              color: #18265a;
              font-size: 24px;
            }

            .setup-form-card h2 {
              color: #18265a;
              font-weight: 900;
              letter-spacing: -.5px;
            }

            .setup-form-card .form-label {
              color: #18265a;
              font-weight: 800;
              font-size: 13px;
            }

            .setup-input {
              border-radius: 14px;
              border: 1px solid #e3e9f5;
              padding: 13px 14px;
              transition: border-color .18s ease, box-shadow .18s ease;
            }

            .setup-input:focus {
              border-color: #3b60c5;
              box-shadow: 0 0 0 .2rem rgba(59, 96, 197, .12);
            }

            .setup-input.is-invalid {
              border-color: #dc3545;
            }

            .setup-input.is-invalid:focus {
              box-shadow: 0 0 0 .2rem rgba(220, 53, 69, .12);
            }

            .setup-warning {
              padding: 13px 14px;
              border-radius: 16px;
              background: #f5f8ff;
              color: #687089;
              font-size: 14px;
              border: 1px solid #e8edf7;
            }

            .btn:disabled {
              opacity: .55;
              cursor: not-allowed;
            }

            @media (max-width: 768px) {
              .setup-info-card,
              .setup-form-card {
                padding: 26px;
              }
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

export default ServiceSetupPage;
