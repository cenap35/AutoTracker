import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimationsEffects/AnimatedText";
import PageWrapper from "../components/PageWrapper";

const FEATURES = [
  {
    icon: "bi-speedometer2",
    color: "#47c172",
    title: "Kontrol paneli",
    text: "Araçlarınızın özetini, son bakımları ve masraf dağılımını tek ekranda takip edin.",
    link: "/dashboard",
    label: "Panele git",
  },
  {
    icon: "bi-tools",
    color: "#079bda",
    title: "Bakım takibi",
    text: "Araçlarınızın bakım kayıtlarını görüntüleyin, filtreleyin ve masraf özetlerini takip edin.",
    link: "/maintenance",
    label: "Bakıma git",
  },
  {
    icon: "bi-calendar-check",
    color: "#ff7c3c",
    title: "Takipler",
    text: "Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı takip edin.",
    link: "/reminders",
    label: "Takiplere git",
  },

  {
    icon: "bi-bar-chart-line",
    color: "#9b59b6",
    title: "Raporlar",
    text: "Araç notlarınızı, yapılacak işleri ve öncelikli kayıtları tek ekrandan takip edin.",
    link: "/reports",
    label: "Raporlara git",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Hesap oluştur",
    text: "Ücretsiz kayıt olun ve e-postanızı doğrulayın.",
  },
  {
    num: "2",
    title: "Aracını ekle",
    text: "Plaka, marka ve model bilgilerini girin.",
  },
  {
    num: "3",
    title: "Masrafları kaydet",
    text: "Her bakım ve gideri tarih ve tutarla işleyin.",
  },
];

function HomePage() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const fullName = localStorage.getItem("fullName");

  return (
    <PageWrapper>
      <div>
        <div
          className="container py-4 py-lg-5 position-relative"
          style={{ zIndex: 1 }}
        >
          {/* Hero */}
          <div className="row align-items-center g-4 g-lg-5 mb-5">
            <div className="col-lg-7 text-center text-lg-start">
              <motion.div
                className="mb-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedText text="AutoTracker" />

                <p
                  className="fw-semibold mt-2 mb-0"
                  style={{
                    color: "#3b60c5",
                    letterSpacing: "0.4px",
                    fontSize: "1.05rem",
                  }}
                >
                  CarCare | Araç Takip ve Masraf Yönetimi
                </p>
              </motion.div>
              <p
                className="lead mb-4 mx-auto mx-lg-0"
                style={{ color: "#284185", maxWidth: 520, lineHeight: 1.6 }}
              >
                Araçlarınızın bakım geçmişini, yaklaşan takiplerini ve tüm
                masraflarını tek ekranda yönetin. AutoTracker; sade arayüzü, net
                özetleri ve akıllı kontrol paneliyle araç yönetimini düzenli
                hale getirir.
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="btn fw-bold px-4 py-2 product-tour-btn"
                      style={{
                        borderRadius: 18,
                        background: "rgba(255,255,255,.88)",
                        color: "#284185",
                        border: "2px solid #d9e4f5",
                        transition: "all .22s ease",
                      }}
                    >
                      <i className="bi bi-speedometer2 me-2" />
                      Panele git
                    </Link>
                    <Link
                      to="/vehicles"
                      className="btn fw-bold px-4 py-2 product-tour-btn"
                      style={{
                        borderRadius: 18,
                        background: "rgba(255,255,255,.88)",
                        color: "#284185",
                        border: "2px solid #d9e4f5",
                        transition: "all .22s ease",
                      }}
                    >
                      <i className="bi bi-car-front me-2" />
                      Araçlarım
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-warning fw-bold px-4 py-2"
                      style={{ borderRadius: 18 }}
                    >
                      <i className="bi bi-person-plus-fill me-2" />
                      Ücretsiz başla
                    </Link>
                    <Link
                      to="/login"
                      className="btn fw-bold px-4 py-2"
                      style={{
                        borderRadius: 18,
                        background: "rgba(59, 96, 197, 0.1)",
                        color: "#3b60c5",
                        border: "2px solid #3b60c5",
                      }}
                    >
                      <i className="bi bi-box-arrow-in-right me-2" />
                      Giriş yap
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <Link
                    to="/product-tour"
                    className="btn fw-bold px-4 py-2 product-tour-btn"
                    style={{
                      borderRadius: 18,
                      background: "rgba(255,255,255,.88)",
                      color: "#284185",
                      border: "2px solid #d9e4f5",
                      transition: "all .22s ease",
                    }}
                  >
                    <i className="bi bi-play-circle-fill me-2" />
                    AutoTracker'ı Keşfet
                  </Link>
                )}
              </div>
              {isLoggedIn && fullName && (
                <p className="mt-3 mb-0 small" style={{ color: "#4a5b75" }}>
                  <i
                    className="bi bi-person-check me-1"
                    style={{ color: "#47c172" }}
                  />
                  Tekrar hoş geldin, <strong>{fullName}</strong>
                </p>
              )}
            </div>

            <div className="col-lg-5">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: 22,
                  background: "rgba(255,255,255,0.97)",
                  border: "1.3px solid #e3eafb",
                }}
              >
                <div className="card-body p-4 p-lg-4">
                  <h2
                    className="h5 fw-bold mb-3 d-flex align-items-center gap-2"
                    style={{ color: "#284185" }}
                  >
                    <i
                      className="bi bi-lightning-charge-fill"
                      style={{ color: "#f7d358" }}
                    />
                    Neden AutoTracker?
                  </h2>
                  <ul
                    className="list-unstyled mb-0"
                    style={{ color: "#1c3967" }}
                  >
                    {[
                      "Araç bazlı bakım ve gider takibi",

                      "Masraf analizleri ve raporlama",

                      "Yaklaşan sigorta ve muayene hatırlatmaları",

                      "Notlar, kayıtlar ve araç geçmişi",

                      "PDF raporları, masraf dağılımı ve daha fazlası",

                      "Ve daha fazlası ...",
                    ].map((item) => (
                      <li
                        key={item}
                        className="d-flex align-items-start gap-2 mb-2"
                        style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
                      >
                        <i
                          className="bi bi-check-circle-fill mt-1 flex-shrink-0"
                          style={{ color: "#47c172" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-5">
            <h2
              className="text-center fw-bold mb-1"
              style={{ color: "#284185", letterSpacing: "0.5px" }}
            >
              <i
                className="bi bi-grid-3x3-gap-fill me-2"
                style={{ color: "#3b60c5" }}
              />
              Uygulama özellikleri
            </h2>
            <p className="text-center text-muted mb-4">
              Araç yönetiminden raporlamaya kadar ihtiyacınız olan her şey
            </p>
            <div className="row g-3 g-md-4">
              {FEATURES.map((f) => (
                <motion.div
                  key={f.title}
                  className="col-sm-6 col-lg-3"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="card h-100 border-0 shadow-sm home-feature-card"
                    style={{
                      borderRadius: 16,
                      background: "#fff",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div className="card-body p-4 d-flex flex-column">
                      <div
                        className="d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `${f.color}18`,
                          color: f.color,
                          fontSize: 22,
                        }}
                      >
                        <i className={`bi ${f.icon}`} />
                      </div>
                      <h3
                        className="h6 fw-bold mb-2"
                        style={{ color: "#284185" }}
                      >
                        {f.title}
                      </h3>
                      <p className="small text-muted mb-3 flex-grow-1">
                        {f.text}
                      </p>
                      {isLoggedIn ? (
                        <Link
                          to={f.link}
                          className="small fw-semibold text-decoration-none"
                          style={{ color: f.color }}
                        >
                          {f.label}
                          <i className="bi bi-arrow-right ms-1" />
                        </Link>
                      ) : (
                        <span className="small text-muted">
                          <i className="bi bi-lock me-1" />
                          Giriş sonrası kullanılabilir
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div
            className="rounded-4 p-4 p-lg-5 mb-4"
            style={{
              background: "linear-gradient(114deg, #f7faff 53%, #fff9f0 100%)",
              border: "1.3px solid #e3eafb",
              boxShadow: "0 8px 32px #c9e7ff22",
            }}
          >
            <h2
              className="h4 fw-bold text-center mb-4"
              style={{ color: "#284185" }}
            >
              <i
                className="bi bi-signpost-split me-2"
                style={{ color: "#3b60c5" }}
              />
              3 adımda başlayın
            </h2>
            <div className="row g-3">
              {STEPS.map((step) => (
                <div key={step.num} className="col-md-4">
                  <div className="d-flex gap-3 align-items-start">
                    <span
                      className="flex-shrink-0 d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg, #3b60c5 55%, #314286 100%)",
                        color: "#ffe082",
                        fontSize: 18,
                        border: "2px solid #f7d358",
                      }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="h6 fw-bold mb-1"
                        style={{ color: "#1c3967" }}
                      >
                        {step.title}
                      </h3>
                      <p className="small text-muted mb-0">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isLoggedIn && (
              <div className="text-center mt-4">
                <Link
                  to="/register"
                  className="btn btn-warning fw-bold px-4"
                  style={{ borderRadius: 18 }}
                >
                  Hemen kayıt ol
                </Link>
              </div>
            )}
          </div>

          {/* Why AutoTracker? */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold mb-3" style={{ color: "#284185" }}>
              AutoTracker ile araç sahipliği daha kolay
            </h2>

            <p
              className="mx-auto"
              style={{
                maxWidth: 800,
                color: "#4a5b75",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              AutoTracker; araçlarınızı, bakım geçmişinizi, masraflarınızı,
              yaklaşan işlemlerinizi ve önemli notlarınızı tek bir platformda
              toplar. Dağınık notlar, unutulan bakım tarihleri ve kontrolü zor
              masraflar yerine tüm araç verilerinize düzenli ve erişilebilir
              şekilde ulaşabilirsiniz.
            </p>
          </motion.div>

          {/* Product Tour */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: 22,
              background: "rgba(255,255,255,0.96)",
              border: "1.3px solid #e3eafb",
            }}
          >
            <div className="card-body p-4 p-lg-5 text-center">
              <h2 className="h4 fw-bold mb-3" style={{ color: "#284185" }}>
                AutoTracker'ı keşfet
              </h2>

              <p
                className="mx-auto mb-4"
                style={{
                  maxWidth: 650,
                  color: "#4a5b75",
                  lineHeight: 1.7,
                }}
              >
                Panel, araç yönetimi, bakım kayıtları, hatırlatmalar ve
                raporlama ekranlarını giriş yapmadan inceleyin.
              </p>

              <Link
                to="/product-tour"
                className="btn fw-bold px-4 py-2 product-tour-btn"
                style={{
                  borderRadius: 18,
                  background: "rgba(255,255,255,.88)",
                  color: "#284185",
                  border: "2px solid #d9e4f5",
                  transition: "all .22s ease",
                }}
              >
                <i className="bi bi-play-circle-fill me-2" />
                AutoTracker'ı Keşfet
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          .home-feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px #3b60c522 !important;
          }
          .home-landing .display-3 {
            font-size: clamp(2rem, 5vw, 3rem);
          }
            .product-tour-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(59,96,197,.18) !important;
          border-color: #3b60c5 !important;
          color: #3b60c5 !important;
          }
        `}</style>
      </div>
    </PageWrapper>
  );
}

export default HomePage;
