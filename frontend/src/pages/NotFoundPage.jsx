import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function NotFoundPage() {
  return (
    <PageWrapper>
      <div
        className="container d-flex align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="card border-0 shadow-sm p-4 p-md-5"
          style={{
            borderRadius: 20,
            maxWidth: 560,
            background: "linear-gradient(120deg, #ffffff 0%, #f5f8ff 100%)",
          }}
        >
          <div className="display-1 fw-bold mb-2" style={{ color: "#3b60c5" }}>
            404
          </div>

          <h1 className="h3 fw-bold mb-2" style={{ color: "#284185" }}>
            Sayfa bulunamadı
          </h1>

          <p className="text-muted mb-4">
            Aradığınız sayfa taşınmış, silinmiş veya hiç oluşturulmamış olabilir.
          </p>

          <Link to="/dashboard" className="btn btn-primary fw-bold px-4">
            <i className="bi bi-speedometer2 me-2"></i>
            Kontrol Paneline Dön
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}

export default NotFoundPage;