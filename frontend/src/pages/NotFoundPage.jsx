import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function NotFoundPage() {
  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "radial-gradient(circle at 65% 35%, #e3ebfa 0%, #f9fbfe 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card border-0 shadow-lg p-4 p-md-5 position-relative overflow-hidden text-center mx-auto"
          style={{
            borderRadius: 36,
            maxWidth: 540,
            width: "92vw",
            background: "linear-gradient(120deg, #eef2ff 60%, #f0f6fc 100%)",
            boxShadow: "0 8px 40px rgba(50,96,197,0.10)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-48px",
              right: "-48px",
              width: "120px",
              height: "120px",
              zIndex: 0,
              background: "radial-gradient(circle, #bad4ff77 50%, transparent 90%)",
              pointerEvents: "none",
              borderRadius: "50%",
              filter: "blur(2.8px)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-36px",
              left: "-36px",
              width: "78px",
              height: "78px",
              zIndex: 0,
              background: "radial-gradient(circle, #dbafec66 70%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "50%",
              filter: "blur(2.5px)",
            }}
          ></div>
          <div className="mb-2" style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                fontSize: 135,
                lineHeight: 1,
                color: "#4565e0",
                fontWeight: 900,
                filter: "drop-shadow(0px 3px 18px #3b60c570)",
                letterSpacing: "0.025em",
              }}
            >
              404
            </span>
          </div>
          <h1
            className="fw-bold mb-3"
            style={{
              color: "#2b3772",
              fontSize: 31,
              position: "relative",
              zIndex: 1,
            }}
          >
            Üzgünüz, sayfayı bulamadık!
          </h1>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "1.16rem",
              position: "relative",
              zIndex: 1,
              maxWidth: 392,
              margin: "0 auto",
            }}
          >
            Görünüşe göre aradığınız sayfa taşınmış, silinmiş veya hiç oluşturulmamış olabilir.
            Adresi kontrol edin veya ana sayfaya dönebilirsiniz.
          </p>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link
              to="/dashboard"
              className="btn btn-primary fw-bold px-4 py-2 d-inline-flex align-items-center"
              style={{
                fontSize: 19,
                borderRadius: 14,
                boxShadow: "0 2px 12px #3b60c522",
                transition: "box-shadow 0.18s",
                gap: "6px",
              }}
            >
              <i className="bi bi-arrow-left-short me-2" style={{ fontSize: 25 }}></i>
              Kontrol Paneline Dön
            </Link>
          </div>
        </div>
      </div>
 
    </PageWrapper>
  );
}

export default NotFoundPage;