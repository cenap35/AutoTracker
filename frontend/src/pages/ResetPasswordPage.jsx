import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Yeni şifreler eşleşmiyor.");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await resetPassword(
        token,
        newPassword,
        confirmNewPassword,
      );

      setMessage(response);
      setNewPassword("");
      setConfirmNewPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data || "Şifre sıfırlanamadı.");
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
        style={{ minWidth: 340, maxWidth: 390, width: "100%" }}
      >
        <h2
          className="text-center mb-3"
          style={{ fontWeight: 700, fontSize: 22, letterSpacing: ".5px" }}
        >
          Şifre Sıfırla
        </h2>

        <p className="text-center mb-4 text-muted" style={{ fontSize: 14 }}>
          Lütfen yeni şifrenizi girin ve tekrar doğrulayın.
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
              type="password"
              className="form-control"
              placeholder="Yeni şifrenizi girin"
              disabled={loading}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
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

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Yeni şifrenizi tekrar girin"
              disabled={loading}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              minLength={6}
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
            disabled={loading}
            style={{
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              padding: "10px 0",
              cursor: loading ? "not-allowed" : "pointer",
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
                Şifre güncelleniyor...
              </>
            ) : (
              "Şifremi Güncelle"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
