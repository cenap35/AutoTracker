import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(fullName, email, password);

      setSuccess(true);
      setError("Lütfen email adresinizi doğrulayın.");

      setFullName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      const errorMessage = err.response?.data || "Kayıt başarısız oldu";

      setError(errorMessage);

      setSuccess(false);

      console.error(err);
    }
  };

  return (
    <PageWrapper>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(110deg, #e8f0fe 70%, #cddafd 100%)",
        }}
      >
        <div
          className="card shadow-lg border-0 p-4 px-4 px-md-5"
          style={{
            maxWidth: 400,
            width: "100%",
            borderRadius: 18,
            background: "rgba(255,255,255,0.96)",
          }}
        >
          <div className="text-center mb-4">
            <div
              style={{
                fontSize: 38,
                marginBottom: 2,
                color: "#4860be",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              <i className="bi bi-person-plus me-2" />
              Kayıt Ol
            </div>
            <div style={{ fontSize: 16, color: "#66729e", marginBottom: 2 }}>
              Hemen hesabınızı oluşturun ve araçlarınızı kolayca yönetin!
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            autoComplete="on"
          >
            <div className="mb-2">
              <label
                className="form-label fw-bold"
                htmlFor="fullName"
                style={{ color: "#3a4a75" }}
              >
                Ad Soyad
              </label>
              <input
                id="fullName"
                type="text"
                className="form-control shadow-sm"
                placeholder="Adınızı ve soyadınızı girin"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={success}
                style={{ fontSize: 16, borderRadius: 8 }}
                autoFocus
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="form-label fw-bold"
                htmlFor="email"
                style={{ color: "#3a4a75" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control shadow-sm"
                placeholder="Email adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={success}
                style={{ fontSize: 16, borderRadius: 8 }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label fw-bold"
                htmlFor="password"
                style={{ color: "#3a4a75" }}
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                className="form-control shadow-sm"
                placeholder="En az 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={success}
                style={{ fontSize: 16, borderRadius: 8 }}
                minLength={6}
                required
              />
            </div>
            <button
              type="submit"
              disabled={success}
              className="btn btn-primary w-100 p-2 fw-bold"
              style={{
                fontSize: 18,
                borderRadius: 7,
                letterSpacing: 1,
                boxShadow: "0 2px 12px #bbe1fc40",
                cursor: success ? "default" : "pointer",
              }}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Kayıt Ol
            </button>
          </form>
          {success && (
            <div
              className="alert alert-success py-2 px-3 mt-3 shadow-sm"
              style={{ fontSize: 16, textAlign: "center", borderRadius: 8 }}
            >
              <i className="bi bi-check2-circle me-2"></i>
              Kayıt başarılı! Lütfen giriş yapınız.
            </div>
          )}
          {error && (
            <div
              className="alert alert-danger py-2 px-3 mt-3 shadow-sm"
              style={{ fontSize: 16, textAlign: "center", borderRadius: 8 }}
            >
              <i className="bi bi-x-octagon-fill me-2"></i>
              {error}
            </div>
          )}
          <div className="text-center mt-4">
            <span style={{ color: "#42508b", fontSize: 15 }}>
              Hesabınız var mı?{" "}
              <a
                href="/login"
                style={{
                  color: "#2345b7",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Giriş Yap
              </a>
            </span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RegisterPage;
