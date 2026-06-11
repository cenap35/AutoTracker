import PageWrapper from "../components/PageWrapper";


function AboutPage() {
  return (
    <PageWrapper>
        <div className="container py-4 py-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p
                className="small text-uppercase fw-semibold mb-1"
                style={{ color: "#3b60c5", letterSpacing: "1px" }}
              >
                Hakkında
              </p>

              <h1 className="h2 fw-bold mb-3" style={{ color: "#284185" }}>
                AutoTracker Nedir?
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
                    AutoTracker; araç sahiplerinin bakım geçmişini, masraflarını,
                    yaklaşan takiplerini ve araç notlarını tek platformda
                    yönetebilmesi için geliştirilmiş bir araç takip
                    uygulamasıdır.
                  </p>

                  <p style={{ color: "#4a5b75", lineHeight: 1.7 }}>
                    Uygulama; araç ekleme, bakım kaydı tutma, sigorta / kasko /
                    MTV / muayene gibi tarihleri takip etme, masraf özetlerini
                    görüntüleme ve araç bazlı not alma özellikleri sunar.
                  </p>

                  <div className="row g-3 mt-3">
                    {[
                      "Araç bazlı kayıt yönetimi",
                      "Bakım ve masraf takibi",
                      "Yaklaşan takip hatırlatmaları",
                      "Dashboard ve rapor ekranları",
                    ].map((item) => (
                      <div className="col-md-6" key={item}>
                        <div
                          className="p-3 rounded-3 h-100"
                          style={{ background: "#f4f8ff" }}
                        >
                          <i
                            className="bi bi-check-circle-fill me-2"
                            style={{ color: "#47c172" }}
                          />
                          <span className="fw-semibold" style={{ color: "#284185" }}>
                            {item}
                          </span>
                        </div>
                      </div>
                    ))}
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
                    Proje Amacı
                  </h2>
                  <p className="mb-0" style={{ color: "#4a5b75", lineHeight: 1.7 }}>
                    Bu proje; modern full-stack geliştirme yaklaşımıyla React,
                    ASP.NET Core Web API, PostgreSQL, JWT Authentication ve
                    kullanıcı odaklı arayüz pratiklerini bir araya getiren bir
                    portfolyo projesi olarak geliştirilmiştir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </PageWrapper>
  );
}

export default AboutPage;