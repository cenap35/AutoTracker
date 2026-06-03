import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import DashboardBackground from "../components/Dashboard/DashboardBackground";

function ProductTourPage() {
  const sections = [
    {
      icon: "bi-speedometer2",
      label: "Panel",
      title: "Kontrol Paneli",
      subtitle: "Araçlarınızın genel durumunu tek ekrandan takip edin.",
      description:
        "Toplam araç sayısı, bakım kayıtları, giderler, yaklaşan hatırlatmalar ve araç bazlı masraf özetleri tek bir kontrol panelinde görüntülenir.",
      imageLabel: "Dashboard ekran görüntüsü",
    },
    {
      icon: "bi-car-front-fill",
      label: "Araçlarım",
      title: "Araç Yönetimi",
      subtitle: "Tüm araç kayıtlarınızı merkezi olarak yönetin.",
      description:
        "Araç ekleme, güncelleme, plaka, model, yıl, kilometre ve araç detaylarını takip etme işlemleri kullanıcıya özel olarak yönetilir.",
      imageLabel: "Araçlar ekran görüntüsü",
    },
    {
      icon: "bi-tools",
      label: "Bakım",
      title: "Bakım ve Servis Takibi",
      subtitle: "Araç bakım geçmişini düzenli ve izlenebilir hale getirin.",
      description:
        "Bakım tarihi, kilometre, açıklama ve maliyet bilgileriyle her aracın servis geçmişi detaylı olarak kayıt altında tutulur.",
      imageLabel: "Bakım ekran görüntüsü",
    },
    {
      icon: "bi-bell-fill",
      label: "Takipler",
      title: "Hatırlatma Sistemi",
      subtitle: "Bakım, muayene ve önemli araç işlemlerini kaçırmayın.",
      description:
        "Yaklaşan bakım, sigorta, muayene veya özel araç görevleri için hatırlatmalar oluşturulabilir ve takip edilebilir.",
      imageLabel: "Hatırlatmalar ekran görüntüsü",
    },
    {
      icon: "bi-journal-text",
      label: "Notlar",
      title: "Araç Notları",
      subtitle: "Araçlara özel önemli bilgileri saklayın.",
      description:
        "Her araç için özel notlar, gözlemler, açıklamalar ve operasyonel kayıtlar güvenli şekilde saklanabilir.",
      imageLabel: "Notlar ekran görüntüsü",
    },
    {
      icon: "bi-file-earmark-pdf-fill",
      label: "Raporlar",
      title: "Raporlama ve PDF Export",
      subtitle: "Araç bilgilerini raporlanabilir hale getirin.",
      description:
        "Araç bilgileri, bakım geçmişi, kilometre kayıtları, giderler ve notlar PDF formatında dışa aktarılabilir.",
      imageLabel: "PDF rapor ekran görüntüsü",
    },
  ];


  return (
    <PageWrapper>
      <DashboardBackground>
        <div className="container py-4 py-lg-5">
          <motion.div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: 820 }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span
              className="badge px-3 py-2 mb-3"
              style={{
                background: "linear-gradient(90deg, #3b60c5, #314286)",
                color: "#ffe082",
                borderRadius: 999,
                letterSpacing: "0.8px",
              }}
            >
              AutoTracker'ı Keşfet
            </span>

            <h1
              className="fw-bold mb-3"
              style={{
                color: "#284185",
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
              }}
            >
              AutoTracker’ı Yakından Keşfedin
            </h1>

            <p
              className="mb-0 mx-auto"
              style={{
                color: "#4a5b75",
                maxWidth: 700,
                lineHeight: 1.65,
                fontSize: "1.05rem",
              }}
            >
              Araç yönetimi, bakım takibi, gider kontrolü, hatırlatmalar, notlar
              ve PDF raporları tek bir modern platformda nasıl birleşiyor
              keşfedin.
            </p>
          </motion.div>

          <div className="row g-4">
            {sections.map((section, index) => (
              <motion.div
                className="col-12"
                key={section.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
              >
                <div
                  className="card border-0 shadow-sm overflow-hidden position-relative"
                  style={{
                    borderRadius: 22,
                    background:
                      "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                    border: "1.3px solid #e3eafb",
                    transition: "all .2s ease",
                  }}
                >
                  {/* dekoratif daire */}
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(59,96,197,.08)",
                    }}
                  />

                  <div className="card-body p-3 p-md-4 p-lg-5">
                    <div
                      className={`row g-4 align-items-center ${
                        index % 2 === 1 ? "flex-lg-row-reverse" : ""
                      }`}
                    >
                      <div className="col-lg-5">
                        <span
                          className="badge mb-3"
                          style={{
                            background: "#fff",
                            color: "#3b60c5",
                            border: "1px solid #dfe7ff",
                            borderRadius: 999,
                            padding: "10px 16px",
                            fontSize: ".85rem",
                          }}
                        >
                          <i className={`bi ${section.icon} me-2`} />
                          {section.label}
                        </span>

                        <h2
                          className="fw-bold mb-2"
                          style={{ color: "#274a78" }}
                        >
                          {section.title}
                        </h2>

                        <h5
                          className="fw-semibold mb-3"
                          style={{ color: "#3b60c5" }}
                        >
                          {section.subtitle}
                        </h5>

                        <p
                          className="mb-0"
                          style={{
                            color: "#4a5b75",
                            lineHeight: 1.7,
                          }}
                        >
                          {section.description}
                        </p>
                      </div>

                      <div className="col-lg-7">
                        <div
                          className="d-flex align-items-center justify-content-center text-center"
                          style={{
                            minHeight: 320,
                            borderRadius: 18,
                            background:
                              "linear-gradient(135deg, #eef4ff, #fff8e8)",
                            border: "1.5px dashed rgba(59,96,197,0.28)",
                            boxShadow: "0 0 45px rgba(59,96,197,.12)",
                            backgroundImage:
                              "radial-gradient(#c7d4ff 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                          }}
                        >
                          <div>
                            <i
                              className={`bi ${section.icon}`}
                              style={{
                                fontSize: "3.8rem",
                                color: "#3b60c5",
                              }}
                            />

                            <p
                              className="fw-bold mt-3 mb-1"
                              style={{
                                color: "#284185",
                                fontSize: "1.05rem",
                              }}
                            >
                              {section.imageLabel}
                            </p>

                            <p
                              className="small mb-0"
                              style={{ color: "#6b7c93" }}
                            >
                              Screenshot will be added here
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DashboardBackground>
    </PageWrapper>
  );
}

export default ProductTourPage;
