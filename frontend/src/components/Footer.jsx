import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <>
      <footer className="mt-auto custom-premium-footer">
        <div className="container py-3">
          <div className="row g-3">
            {/* LOGO & AÇIKLAMA ALANI */}
            <div className="col-lg-4 text-center text-lg-start">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2">
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  <Logo size={36} />{" "}
                </Link>

                <span className="footer-brand-text fw-bold">AutoTracker</span>
              </div>
              <p
                className="footer-description small mb-0 mx-auto mx-lg-0"
                style={{ fontSize: "12.5px", marginBottom: "0.2rem" }}
              >
                Araç bakım, masraf, not ve hatırlatma süreçlerinizi tek panelden
                güvenli ve düzenli şekilde yönetin.
              </p>
            </div>

            {/* ÜRÜN LİNKLERİ */}
            <div className="col-6 col-lg-2 text-center text-lg-start ms-lg-auto">
              <h6 className="footer-section-title fw-bold mb-2">Ürün</h6>
              <div className="d-flex flex-column gap-1">
                <Link to="/product-tour" className="footer-link">
                  AutoTracker'ı Keşfet
                </Link>
                <Link to="/about" className="footer-link">
                  Hakkında
                </Link>
                <Link to="/contact" className="footer-link">
                  İletişim
                </Link>
              </div>
            </div>

            {/* BAĞLANTILAR (SOSYAL MEDYA / MAIL) */}
            <div className="col-6 col-lg-4 text-center text-lg-end">
              <h6 className="footer-section-title fw-bold mb-2">Bağlantılar</h6>
              <div className="d-inline-flex align-items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/cenapbayram-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </a>

                <a
                  href="mailto:autotrackercarcare@gmail.com"
                  className="footer-social-btn"
                  aria-label="Mail"
                >
                  <i className="bi bi-envelope-fill" />
                </a>
              </div>
            </div>
          </div>

          <hr className="footer-hr my-3" />

          {/* ALT BİLGİ ALANI */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-1 small footer-bottom-text">
            <span style={{ fontSize: "12.5px" }}>
              © {new Date().getFullYear()} AutoTracker. Tüm hakları saklıdır.
            </span>
            <span
              className="footer-version-badge"
              style={{ fontSize: "12.5px" }}
            >
              Version 1.3
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-premium-footer {
          background: linear-gradient(135deg, #0f172a 0%, #111827 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          padding-top: 0;
          padding-bottom: 0;
        }

        .footer-brand-text {
          color: #ffffff;
          font-size: 1.11rem;
          letter-spacing: -0.5px;
          background: linear-gradient(126deg, #ffffff 60%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-description {
          color: #94a3b8;
          max-width: 285px;
          line-height: 1.45;
        }

        .footer-section-title {
          color: #ffffff;
          font-size: 0.92rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 1px 0;
        }
        .footer-link:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #a5b4fc;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 1rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        .footer-social-btn:hover {
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .footer-hr {
          border-color: rgba(255, 255, 255, 0.08);
          opacity: 1;
          margin-top: 0.6rem !important;
          margin-bottom: 0.6rem !important;
        }

        .footer-bottom-text {
          color: #64748b;
          font-weight: 500;
        }

        .footer-version-badge {
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #94a3b8;
        }

        @media (max-width: 991.98px) {
          .footer-link:hover {
            transform: none;
          }
          .footer-section-title {
            margin-top: 8px;
          }
          .custom-premium-footer .container {
            padding-top: 1.1rem !important;
            padding-bottom: 0.8rem !important;
          }
        }

        .custom-premium-footer .container {
          padding-top: 1.1rem !important;
          padding-bottom: 0.8rem !important;
        }
      `}</style>
    </>
  );
}

export default Footer;
