import { useState } from "react";
import { login, resendConfirmationEmail } from "../services/authService";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("email", data.email);

      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data || "Email veya şifre hatalı";

      setError(errorMessage);

      if (errorMessage.includes("doğrulayın")) {
        setShowResend(true);
      }

      setTimeout(() => {
        setError("");
      }, 7000);

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
            maxWidth: 370,
            width: "100%",
            borderRadius: 18,
            background: "rgba(255,255,255,0.97)",
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
              <i className="bi bi-person-circle me-2" />
              Giriş Yap
            </div>
            <div style={{ fontSize: 16, color: "#66729e", marginBottom: 2 }}>
              Hoş geldiniz! Lütfen hesabınızla giriş yapın.
            </div>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="mb-3">
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
                required
                style={{ fontSize: 16, borderRadius: 7 }}
                autoFocus
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
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ fontSize: 16, borderRadius: 7 }}
              />
            </div>

            {error && (
              <div
                className="alert alert-danger py-2 px-3 mb-3 shadow-sm"
                style={{ fontSize: 15 }}
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {showResend && (
              <button
                type="button"
                className="btn btn-outline-warning w-100 mb-3"
                disabled={resendCooldown}
                onClick={async () => {
                  try {
                    setResendCooldown(true);

                    const message = await resendConfirmationEmail(email);
                    setError(message);

                    setTimeout(() => {
                      setResendCooldown(false);
                    }, 30000);
                  } catch (err) {
                    setError(
                      err.response?.data || "Email tekrar gönderilemedi.",
                    );
                    setResendCooldown(false);
                  }
                }}
              >
                {resendCooldown
                  ? "Tekrar göndermek için bekleyin..."
                  : "Doğrulama emailini tekrar gönder"}
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 p-2 fw-bold"
              style={{
                fontSize: 18,
                borderRadius: 7,
                boxShadow: "0 2px 12px #bbe1fc40",
              }}
            >
              <i className="bi bi-door-open me-2"></i>
              Giriş Yap
            </button>
          </form>


          <div className="text-end mb-3">
            <a
              href="/forgot-password"
              style={{
                fontSize: 14,
                color: "#3977f5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Şifremi unuttum
            </a>
          </div>



          <div className="text-center mt-4" style={{ fontSize: 15 }}>
            Hesabınız yok mu?{" "}
            <a
              href="/register"
              style={{
                color: "#3977f5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <i className="bi bi-person-plus-fill me-1"></i>Kayıt Ol
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default LoginPage;
