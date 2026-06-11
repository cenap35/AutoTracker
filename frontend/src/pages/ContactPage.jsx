import PageWrapper from "../components/PageWrapper";

function ContactPage() {
  return (
    <PageWrapper>
      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p
              className="small text-uppercase fw-semibold mb-1"
              style={{ color: "#3b60c5", letterSpacing: "1px" }}
            >
              İletişim
            </p>

            <h1 className="h2 fw-bold mb-3" style={{ color: "#284185" }}>
              Benimle İletişime Geç
            </h1>

            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: 18,
                background: "rgba(255,255,255,0.97)",
              }}
            >
              <div className="card-body p-4 p-lg-5">
                <p style={{ color: "#4a5b75", lineHeight: 1.7 }}>
                  AutoTracker, araç takip ve masraf yönetimi üzerine
                  geliştirilmiş bir full-stack portfolyo projesidir. Proje,
                  geliştirme sürecinde yeni özellikler ve iyileştirmelerle
                  büyütülmektedir.
                </p>

                <div className="d-grid gap-3 mt-4">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                    <i
                      className="bi bi-envelope-fill fs-4"
                      style={{ color: "#3b60c5" }}
                    />
                    <div>
                      <div className="fw-bold" style={{ color: "#284185" }}>
                        E-posta
                      </div>
                      <div className="text-muted">
                        <a
                          href="mailto:autotrackercarcare@gmail.com"
                          style={{ color: "#0a66c2", textDecoration: "none" }}
                        >
                          autotrackercarcare@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                    <i
                      className="bi bi-github fs-4"
                      style={{ color: "#222" }}
                    />
                    <div>
                      <div className="fw-bold" style={{ color: "#284185" }}>
                        GitHub
                      </div>
                      <div className="text-muted">
                        <a
                          href="https://github.com/cenap35"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#0a66c2", textDecoration: "none" }}
                        >
                          https://github.com/cenap35
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                    <i
                      className="bi bi-linkedin fs-4"
                      style={{ color: "#0a66c2" }}
                    />
                    <div>
                      <div className="fw-bold" style={{ color: "#284185" }}>
                        LinkedIn
                      </div>
                      <div className="text-muted">
                        <a
                          href="https://www.linkedin.com/in/cenapbayram-dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#0a66c2", textDecoration: "none" }}
                        >
                          www.linkedin.com/in/cenapbayram-dev
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: 18,
                background: "linear-gradient(120deg, #f3f8ff 0%, #fffef8 100%)",
              }}
            >
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-2" style={{ color: "#284185" }}>
                  Geri Bildirim
                </h2>
                <p
                  className="mb-0"
                  style={{ color: "#4a5b75", lineHeight: 1.7 }}
                >
                  Proje hakkında öneri, hata bildirimi veya geliştirme fikri
                  paylaşmak için e-posta veya LinkedIn üzerinden iletişim
                  kurulabilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ContactPage;
