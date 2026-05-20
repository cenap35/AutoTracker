import React from "react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-light border-top py-3">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="mb-2 mb-md-0">
          <Logo size={32} />
        </div>
        <div className="text-muted small">
          © {new Date().getFullYear()} AutoTracker. Tüm hakları saklıdır.
        </div>
        <div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary me-3"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="mailto:destek@autotracker.com"
            className="text-primary"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;