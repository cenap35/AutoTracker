import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

const MODULES = [
  {
    icon: "📊",
    title: "Dashboard",
    text: "Gelir, iş emri durumu, son işlemler ve servis performansını tek ekranda takip edin.",
    to: "/service/dashboard",
    color: "#3b60c5",
  },
  {
    icon: "👥",
    title: "Müşteriler",
    text: "Müşteri bilgilerini, araçlarını ve servis geçmişini düzenli şekilde yönetin.",
    to: "/service/customers",
    color: "#079bda",
  },
  {
    icon: "🚗",
    title: "Araçlar",
    text: "Servise gelen araçları müşteriyle ilişkilendirin, kilometre ve plaka bilgilerini takip edin.",
    to: "/service/vehicles",
    color: "#1a906c",
  },
  {
    icon: "🔧",
    title: "İş Emirleri",
    text: "Bakım ve onarım süreçlerini oluşturun, durumlarını değiştirin ve işlem sürelerini görün.",
    to: "/service/work-orders",
    color: "#b78b16",
  },
  {
    icon: "📦",
    title: "Stoklar",
    text: "Yedek parçaları, alış-satış fiyatlarını ve kritik stok durumlarını takip edin.",
    to: "/service/parts",
    color: "#9b59b6",
  },
  {
    icon: "📝",
    title: "Notlar",
    text: "Servis içi hatırlatmaları, önemli işleri ve günlük notları kayıt altında tutun.",
    to: "/service/notes",
    color: "#ff7c3c",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

function ServiceHomePage() {
  return (
    <PageWrapper>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <ServicePageHeader
            icon="🏠"
            title="AutoTracker Service"
            subtitle="Servis yönetim paneline hoş geldiniz."
          />
        </motion.div>

        <motion.div
          className="card border-0 shadow-sm mb-4 service-home-hero"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          whileHover={{
            scale: 1.006,
            transition: { duration: 0.22 },
          }}
          style={{
            borderRadius: 24,
            overflow: "hidden",
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,.22), transparent 35%), linear-gradient(135deg, #101936 0%, #18265a 55%, #3b60c5 100%)",
          }}
        >
          <div className="card-body p-4 p-lg-5 text-white">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <motion.span
                  className="badge mb-3"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  style={{
                    background: "rgba(255,255,255,.14)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,.18)",
                    borderRadius: 999,
                    padding: "8px 12px",
                  }}
                >
                  🔧 Profesyonel servis yönetimi
                </motion.span>

                <motion.h1
                  className="fw-bold mb-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22 }}
                  style={{ maxWidth: 760 }}
                >
                  Servis süreçlerinizi tek panelden yönetin.
                </motion.h1>

                <motion.p
                  className="mb-4"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  style={{
                    maxWidth: 780,
                    color: "rgba(255,255,255,.78)",
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                  }}
                >
                  AutoTracker Service; müşteri kayıtları, araç takipleri, iş
                  emirleri, stoklar, notlar ve gelir özetlerini tek yerde
                  toplar. Böylece servisinizde kimin aracı geldi, hangi işlem
                  yapıldı, ne kadar tutar çıktı ve hangi işler bekliyor soruları
                  dağınık defterler yerine düzenli bir panelden takip edilir.
                </motion.p>

                <motion.div
                  className="d-flex gap-2 flex-wrap"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.38 }}
                >
                  <Link
                    to="/service/dashboard"
                    className="btn btn-warning fw-bold px-4 service-home-button"
                    style={{ borderRadius: 14 }}
                  >
                    <i className="bi bi-speedometer2 me-2" />
                    Dashboard’a Git
                  </Link>

                  <Link
                    to="/service/work-orders"
                    className="btn fw-bold px-4 service-home-glass-button"
                    style={{
                      borderRadius: 14,
                      background: "rgba(255,255,255,.12)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,.22)",
                    }}
                  >
                    <i className="bi bi-tools me-2" />
                    İş Emri Oluştur
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="col-lg-4"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.28 }}
              >
                <motion.div
                  className="p-4"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    borderRadius: 22,
                    background: "rgba(255,255,255,.1)",
                    border: "1px solid rgba(255,255,255,.16)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <h5 className="fw-bold mb-3">Servis akışı</h5>

                  {[
                    "Müşteri kaydı oluştur",
                    "Aracı servise ekle",
                    "İş emri aç",
                    "Durumu takip et",
                    "Ücret ve süreyi gör",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      className="d-flex gap-3 mb-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.42 + index * 0.08,
                      }}
                    >
                      <motion.div
                        className="d-flex align-items-center justify-content-center fw-bold"
                        whileHover={{ scale: 1.14, rotate: 4 }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.16)",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </motion.div>

                      <div style={{ color: "rgba(255,255,255,.82)" }}>
                        {item}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="row g-3 mb-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <InfoCard
            icon="⚡"
            title="Hızlı kullanım"
            text="Günlük servis işlerinde hızlı müşteri, araç ve iş emri kaydı oluşturabilirsiniz."
          />

          <InfoCard
            icon="🧾"
            title="Düzenli kayıt"
            text="Her işlem müşteriye ve araca bağlı tutulur. Geçmiş kayıtları bulmak kolaylaşır."
          />

          <InfoCard
            icon="📈"
            title="Gelir takibi"
            text="Tamamlanan iş emirleri üzerinden toplam gelir ve aylık gelir hareketlerini görebilirsiniz."
          />

          <InfoCard
            icon="⏱️"
            title="Süre kontrolü"
            text="İş emirlerinde oluşturulma ve tamamlanma zamanı sayesinde işlem süreleri takip edilir."
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 850 }}>
              Servis modülleri
            </h5>

            <span className="badge bg-light text-dark border">
              {MODULES.length} modül
            </span>
          </div>

          <motion.div
            className="row g-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
          >
            {MODULES.map((module) => (
              <HomeCard key={module.title} {...module} />
            ))}
          </motion.div>
        </motion.div>

        <div className="row g-3">
          <motion.div
            className="col-lg-7"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.28 }}
          >
            <div className="card border-0 shadow-sm h-100 service-home-card">
              <div className="card-body p-4">
                <h5
                  className="mb-3"
                  style={{ color: "#18265a", fontWeight: 850 }}
                >
                  Servis için neden değerli?
                </h5>

                <motion.div
                  className="d-grid gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Benefit
                    icon="✅"
                    title="Dağınık notları azaltır"
                    text="Telefon, kağıt, WhatsApp ve akılda kalan işleri tek panele toplar."
                  />

                  <Benefit
                    icon="✅"
                    title="Müşteri geçmişi oluşur"
                    text="Aynı müşteri tekrar geldiğinde önceki araç ve iş emri kayıtları görülebilir."
                  />

                  <Benefit
                    icon="✅"
                    title="İş takibi netleşir"
                    text="Bekleyen, işlemde ve tamamlanan işler ayrı ayrı takip edilir."
                  />

                  <Benefit
                    icon="✅"
                    title="Gelir görünür hale gelir"
                    text="Servis sahibi günlük ve aylık iş hacmini daha net okuyabilir."
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-lg-5"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.28 }}
          >
            <div
              className="card border-0 shadow-sm h-100 service-home-card"
              style={{
                background:
                  "linear-gradient(135deg, #fff8e6 0%, #ffffff 100%)",
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="mb-3"
                  style={{ color: "#18265a", fontWeight: 850 }}
                >
                  Önerilen kullanım sırası
                </h5>

                <motion.div
                  className="d-grid gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Step to="/service/customers" num="1" text="Müşteri ekle" />
                  <Step to="/service/vehicles" num="2" text="Aracı bağla" />
                  <Step
                    to="/service/work-orders"
                    num="3"
                    text="İş emri oluştur"
                  />
                  <Step to="/service/parts" num="4" text="Stokları gir" />
                  <Step to="/service/dashboard" num="5" text="Paneli takip et" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/service/customers"
                    className="btn btn-primary w-100 mt-4"
                  >
                    İlk Müşteriyi Ekle
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <style>
          {`
            .service-home-card {
              transition:
                box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
                transform 0.22s cubic-bezier(.17,.67,.59,1.17),
                background 0.18s ease;
            }

            .service-home-card:hover {
              box-shadow:
                0 14px 34px rgba(44, 62, 100, 0.18),
                0 2px 6px rgba(180, 206, 237, 0.16) !important;
              transform: translateY(-2px) scale(1.017);
            }

            .service-home-hero {
              box-shadow: 0 18px 42px rgba(24, 38, 90, .18) !important;
            }

            .service-home-hero h1 {
              font-size: clamp(2rem, 4vw, 3.2rem);
            }

            .service-home-button:hover,
            .service-home-glass-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 26px rgba(0,0,0,.16);
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

function HomeCard({ icon, title, text, to, color }) {
  return (
    <motion.div
      className="col-md-6 col-xl-4"
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link to={to} className="text-decoration-none text-dark">
        <motion.div
          className="service-home-card card border-0 shadow-sm h-100"
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="card-body p-4">
            <motion.div
              className="d-flex align-items-center justify-content-center mb-3"
              whileHover={{ rotate: 4, scale: 1.12 }}
              transition={{ type: "spring", stiffness: 280, damping: 14 }}
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: `${color}18`,
                color,
                fontSize: 28,
              }}
            >
              {icon}
            </motion.div>

            <h5
              className="mb-2"
              style={{ color: "#18265a", fontWeight: 850 }}
            >
              {title}
            </h5>

            <p className="text-muted mb-3">{text}</p>

            <span style={{ color, fontWeight: 800 }}>
              Aç
              <i className="bi bi-arrow-right ms-1" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <motion.div
      className="col-md-6 col-xl-3"
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="service-home-card card border-0 shadow-sm h-100"
        whileHover={{ y: -4, scale: 1.018 }}
      >
        <div className="card-body p-4">
          <motion.div
            style={{ fontSize: 30 }}
            whileHover={{ scale: 1.18, rotate: -4 }}
          >
            {icon}
          </motion.div>

          <h6 className="mt-3 mb-2" style={{ color: "#18265a", fontWeight: 850 }}>
            {title}
          </h6>

          <p className="text-muted small mb-0">{text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <motion.div className="d-flex gap-3" variants={fadeUp}>
      <motion.div whileHover={{ scale: 1.18, rotate: 4 }}>{icon}</motion.div>

      <div>
        <h6 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
          {title}
        </h6>

        <p className="text-muted mb-0">{text}</p>
      </div>
    </motion.div>
  );
}

function Step({ num, text, to }) {
  return (
    <motion.div variants={fadeUp}>
      <Link to={to} className="text-decoration-none">
        <motion.div
          className="d-flex align-items-center gap-3 p-3 rounded-3"
          whileHover={{ x: 5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "rgba(255,255,255,.82)",
            border: "1px solid #edf2fb",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center fw-bold"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#18265a",
              color: "white",
              flexShrink: 0,
            }}
          >
            {num}
          </div>

          <span style={{ color: "#18265a", fontWeight: 750 }}>{text}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default ServiceHomePage;