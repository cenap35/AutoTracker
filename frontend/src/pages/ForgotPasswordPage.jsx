import { useState } from "react";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCooldown) return;

    try {
      setIsCooldown(true);

      const response = await forgotPassword(email);
      setMessage(response);
      setError("");

      setTimeout(() => {
        setIsCooldown(false);
      }, 30000);
    } catch (err) {
      setError(err.response?.data || "Bir hata oluştu.");
      setMessage("");

      setIsCooldown(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Şifremi Unuttum</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isCooldown}
        >
          {isCooldown
            ? "Tekrar göndermek için bekleyin..."
            : "Şifre Sıfırlama Linki Gönder"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
