import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer
      className="border-top mt-auto"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container py-4">
        <div className="row g-4 align-items-center">
          {/* Sol */}
          <div className="col-lg-4 text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2">
              <Logo size={34} />
              <span
                className="fw-bold"
                style={{
                  color: "#284185",
                  fontSize: "1.1rem",
                }}
              >
                AutoTracker
              </span>
            </div>

            <p
              className="small mb-0"
              style={{
                color: "#6c7a92",
                maxWidth: 280,
              }}
            >
              Araç bakım, masraf ve takip yönetimini tek noktadan yönetin.
            </p>
          </div>

          {/* Orta */}
          <div className="col-lg-4">
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <Link
                to="/about"
                className="text-decoration-none fw-semibold"
                style={{
                  color: "#284185",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  transition: "background 0.18s, color 0.18s",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#f0f4ff";
                  e.target.style.color = "#3b60c5";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "none";
                  e.target.style.color = "#284185";
                }}
              >
                Hakkında
              </Link>

              <Link
                to="/contact"
                className="text-decoration-none fw-semibold"
                style={{
                  color: "#284185",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  transition: "background 0.18s, color 0.18s",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#f0f4ff";
                  e.target.style.color = "#3b60c5";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "none";
                  e.target.style.color = "#284185";
                }}
              >
                İletişim
              </Link>
            </div>
          </div>
     

          {/* Sağ */}
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-inline-flex align-items-center gap-3">
              <a
                href="https://www.linkedin.com/in/cenapbayram-dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0a66c2",
                  fontSize: "1.3rem",
                  borderRadius: "50%",
                  transition: "background 0.18s, color 0.18s",
                  padding: "6px"
                }}
                aria-label="LinkedIn"
                onMouseEnter={(e) => {
                  e.target.style.background = "#e6f0fa";
                  e.target.style.color = "#004182";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "none";
                  e.target.style.color = "#0a66c2";
                }}
              >
                <i className="bi bi-linkedin" />
              </a>
              <a
                href="mailto:cenapbyrm@gmail.com"
                style={{
                  color: "#284185",
                  fontSize: "1.3rem",
                  borderRadius: "50%",
                  transition: "background 0.18s, color 0.18s",
                  padding: "6px"
                }}
                aria-label="Mail"
                onMouseEnter={(e) => {
                  e.target.style.background = "#f0f4ff";
                  e.target.style.color = "#3b60c5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "none";
                  e.target.style.color = "#284185";
                }}
              >
                <i className="bi bi-envelope-fill" />
              </a>
            </div>
          </div>
     
        </div>

        <hr className="my-3" />

        <div className="text-center small" style={{ color: "#7c8aa5" }}>
          © {new Date().getFullYear()} AutoTracker • Version 1.0
        </div>
      </div>
    </footer>
  );
}

export default Footer;
