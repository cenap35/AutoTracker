import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

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
      setError("");
      setFullName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err) {
      setError("Kayıt başarısız oldu");
      setSuccess(false);
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 7 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={success}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={success}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={success}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={success}
          style={{
            padding: 10,
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: success ? "default" : "pointer"
          }}
        >
          Kayıt Ol
        </button>
      </form>
      {success && (
        <p style={{ color: "green", marginTop: 16, textAlign: "center" }}>
          Kayıt başarılı, lütfen giriş yapınız
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: 16, textAlign: "center" }}>{error}</p>
      )}
    </div>
  );
}

export default RegisterPage;