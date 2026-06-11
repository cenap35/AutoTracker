import { useState } from "react";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCooldown || loading) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await forgotPassword(email);
      setMessage(response);

      setIsCooldown(true);

      setTimeout(() => {
        setIsCooldown(false);
      }, 30000);
    } catch (err) {
      setError(err.response?.data || "Bir hata oluştu.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh", background: "#f8f9fa" }}
    >
      <div
        className="shadow-sm rounded-4 bg-white p-4"
        style={{ minWidth: 340, maxWidth: 370, width: "100%" }}
      >
        <h2
          className="text-center mb-3"
          style={{ fontWeight: 700, fontSize: 22, letterSpacing: ".5px" }}
        >
          Şifremi Unuttum
        </h2>
        <p className="text-center mb-4 text-muted" style={{ fontSize: 14 }}>
          Şifre sıfırlama bağlantısı için e-posta adresinizi girin.
        </p>
        {message && (
          <div
            className="alert alert-success py-2 text-center mb-3"
            style={{ fontSize: 14 }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            className="alert alert-danger py-2 text-center mb-3"
            style={{ fontSize: 14 }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              id="forgot-email"
              type="email"
              className="form-control"
              placeholder="E-posta adresiniz"
              value={email}
              disabled={loading || isCooldown}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              style={{
                borderRadius: 10,
                fontSize: 15,
                padding: "10px 12px",
                background: "#f5f6fa",
                borderColor: "#e0e3ec",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isCooldown || loading}
            style={{
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              padding: "10px 0",
              cursor: isCooldown || loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.85 : 1,
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Email gönderiliyor...
              </>
            ) : isCooldown ? (
              "Tekrar göndermek için bekleyin..."
            ) : (
              "Şifre Sıfırlama Linki Gönder"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
