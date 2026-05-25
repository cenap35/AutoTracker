import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios";

function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Email doğrulanıyor...");
  const [isSuccess, setIsSuccess] = useState(false);
  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setMessage("Geçersiz doğrulama linki.");
      setIsSuccess(false);
      return;
    }

    api
      .get(`/auth/confirm-email?token=${token}`)
      .then((res) => {
        setMessage(res.data);
        setIsSuccess(true);
      })
      .catch((err) => {
        setMessage(err.response?.data || "Email doğrulanamadı.");
        setIsSuccess(false);
      });
  }, [searchParams]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 420, width: "100%" }}>
        <div className="mb-4">
          {isSuccess ? (
            <i className="bi bi-patch-check-fill text-success" style={{ fontSize: "3rem" }}></i>
          ) : (
            <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: "3rem" }}></i>
          )}
        </div>
        <h2 className="mb-3 fw-bold text-primary">Email Doğrulama</h2>

        <p className={`mb-4 fs-5 fw-semibold ${isSuccess ? "text-success" : "text-danger"}`}>
          {message}
        </p>

        {isSuccess ? (
          <Link to="/login" className="btn btn-success btn-lg w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Giriş Yap
          </Link>
        ) : (
          <Link to="/" className="btn btn-outline-secondary w-100">
            <i className="bi bi-arrow-left me-2"></i>
            Ana Sayfa
          </Link>
        )}
      </div>
    </div>
  );
}

export default ConfirmEmailPage;