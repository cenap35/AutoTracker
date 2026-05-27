import PageWrapper from "../components/PageWrapper";
import { changePassword } from "../services/authService";
import { useState } from "react";

function AccountPage() {
  const fullName = localStorage.getItem("fullName") || "Kullanıcı";
  const email = localStorage.getItem("email") || "Email bilgisi yok";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      setPasswordMessage("Şifre başarıyla güncellendi.");
      setPasswordError("");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPasswordError(err.response?.data || "Şifre güncellenemedi.");
      setPasswordMessage("");
    }
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold" style={{ color: "#284185" }}>
            <i className="bi bi-person-circle me-2"></i>
            Hesap Ayarları
          </h1>
          <p className="text-muted">
            Profil bilgilerinizi, şifre işlemlerinizi ve hesap güvenliğinizi
            yönetin.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: 18 }}
            >
              <div className="card-body p-4 text-center">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b60c5, #284185)",
                    color: "#fff",
                    fontSize: 32,
                  }}
                >
                  <i className="bi bi-person-fill"></i>
                </div>

                <h4 className="fw-bold mb-1">{fullName}</h4>
                <p className="text-muted mb-3">{email}</p>

                <span className="badge bg-success-subtle text-success border px-3 py-2">
                  Aktif Hesap
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: 18 }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: "#284185" }}>
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Profil Bilgileri
                </h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">
                      Ad Soyad
                    </label>
                    <input className="form-control" value={fullName} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">
                      Email
                    </label>
                    <input className="form-control" value={email} disabled />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: 16 }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3" style={{ color: "#314286" }}>
                  <i className="bi bi-key me-2"></i>
                  Şifre Değiştir
                </h4>

                {passwordMessage && (
                  <div className="alert alert-success">{passwordMessage}</div>
                )}

                {passwordError && (
                  <div className="alert alert-danger">{passwordError}</div>
                )}

                <form onSubmit={handleChangePassword}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-muted small">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-muted small">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={6}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-muted small">
                        Yeni Şifre Tekrar
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        minLength={6}
                        required
                      />
                    </div>

                    <div className="col-12 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary fw-bold px-4"
                      >
                        <i className="bi bi-shield-lock me-2"></i>
                        Şifreyi Güncelle
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: 18 }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: "#284185" }}>
                  <i className="bi bi-shield-lock me-2"></i>
                  Hesap Güvenliği
                </h5>

                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                  <div>
                    <div className="fw-semibold">Oturum Durumu</div>
                    <div className="text-muted small">
                      Bu cihazda aktif olarak giriş yapılmış.
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger fw-bold"
                  >
                    Tüm Oturumlardan Çık
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default AccountPage;
