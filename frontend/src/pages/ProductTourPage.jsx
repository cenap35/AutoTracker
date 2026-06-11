import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import dashboardImg from "../assets/product-tour/dashboard.png";
import dashboard2Img from "../assets/product-tour/dashboard2.png";
import vehiclesImg from "../assets/product-tour/vehicles.png";
import vehicleDetailImg from "../assets/product-tour/vehicle-detail.png";
import maintenanceImg from "../assets/product-tour/maintenance.png";
import remindersImg from "../assets/product-tour/reminders.png";
import reportsImg from "../assets/product-tour/reports.png";
import pdf1Img from "../assets/product-tour/pdf1.png";

function ProductTourPage() {
  const sections = [
    {
      icon: "bi-car-front-fill",
      label: "Araçlarım",
      title: "Araç ekle sil",
      subtitle: "Tüm araç kayıtlarınızı merkezi olarak yönetin.",
      description:
        "Araç ekleme ve silme işlemlerinizi kolaylıkla yapabilirsiniz.",
      image: vehiclesImg,
    },
    {
      icon: "bi-car-front-fill",
      label: "Araç Detay",
      title: "Detaya gir",
      subtitle:
        "Araçlarınıza dair tüm bilgilere ve kontrollerine tek yerden ulaşın.",

      description:
        "Araç bilgilerinizi güncelleyebilir, plaka, model, yıl, kilometre ve diğer detaylara kolayca erişebilir; bakım kayıtları, notlar ve takipleri hızlıca görüntüleyip yönetebilirsiniz.",

      image: vehicleDetailImg,
    },
    {
      icon: "bi-speedometer2",
      label: "Panel",
      title: "Panelde özetini gör",
      subtitle: "Araçlarınızın genel durumunu tek ekrandan takip edin.",
      description:
        "Toplam araç sayısı, bakım kayıtları, giderler, yaklaşan hatırlatmalar ve araç bazlı masraf özetleri tek bir kontrol panelinde görüntülenir.",
      image: dashboardImg,
    },
    {
      icon: "bi-speedometer2",
      label: "Panel",
      title: "Analizleri incele",
      subtitle: "Araçlarınızın genel durumunu tek ekrandan takip edin.",
      description:
        "Burada araçlarınızla ilgili tüm analizleri ve özet raporları tek ekranda kolayca görüntüleyebilirsiniz.",

      image: dashboard2Img,
    },
    {
      icon: "bi-tools",
      label: "Bakım",
      title: "Bakımları yönet",
      subtitle: "Araç bakım geçmişini düzenli ve izlenebilir hale getirin.",
      description:
        "Bakım tarihi, kilometre, açıklama ve maliyet bilgileriyle her aracın servis geçmişini kayıt altında tutun.",
      image: maintenanceImg,
    },
    {
      icon: "bi-bell-fill",
      label: "Hatırlatmalar",
      title: "Hatırlatmaları takip et",
      subtitle: "Bakım, muayene ve önemli araç işlemlerini kaçırmayın.",
      description:
        "Yaklaşan bakım, sigorta, muayene veya özel araç görevleri için hatırlatmalar oluşturun ve takip edin.",
      image: remindersImg,
    },
    {
      icon: "bi-journal-text",
      label: "Raporlar Ve Notlar",
      title: "Notlarını tut",
      subtitle: "Araç hakkında notlar alın önem düzeyine göre kategorileyin.",
      description:
        "Araçlarınıza dair önemli notlarınızı, görevlerinizi ve raporlarınızı kolayca kaydedin ve düzenleyin.",

      image: reportsImg,
    },
    {
      icon: "bi-file-earmark-pdf-fill",
      label: "PDF",
      title: "PDF al",
      subtitle: "Araç bilgilerini raporlanabilir hale getirin.",
      description:
        "Araç bilgileri, bakım geçmişi, kilometre kayıtları, giderler ve notları PDF formatında dışa aktarın.",
      image: pdf1Img,
    },
  ];

  return (
    <PageWrapper>
      <div className="container py-4 py-lg-5">
        {/* Hero */}
        <motion.div
          className="text-center mx-auto mb-5"
          style={{ maxWidth: 1080 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-3"
          >
            <motion.h1
              className="fw-bold"
              style={{
                color: "#3047b2",
                fontSize: "clamp(2.7rem, 7vw, 4.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-.5px",
                marginBottom: "16px",
                fontWeight: 900,
                display: "block",
                // textTransform: "uppercase", // kaldırıldı, hepsi büyük olmasın
                background: "linear-gradient(92deg, #3047b2, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, scale: 0.92, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.05,
                type: "spring",
                stiffness: 100,
                damping: 14,
              }}
            >
              AutoTracker
            </motion.h1>

            <span
              style={{
                display: "inline-block",
                color: "#3047b2",
                fontWeight: 600,
                fontSize: "1.15rem",
                padding: "2px 0",
                marginBottom: "10px",
                letterSpacing: "0.6px",
                background: "none",
                borderRadius: 0,
                boxShadow: "none",
                textTransform: "none",
              }}
            ></span>
            <motion.h2
              className="fw-bold"
              style={{
                color: "#25397f",
                fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
                lineHeight: 1.12,
                letterSpacing: "-.5px",
                marginBottom: "10px",
                fontWeight: 900,
                display: "inline-block",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 35, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.11,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              }}
              whileTap={{
                scale: 0.96,
                rotate: -2,
              }}
            >
              Dijital Garajınıza Hoş Geldiniz
            </motion.h2>

            <motion.p
              style={{
                color: "#466395",
                maxWidth: 705,
                margin: "0 auto",
                lineHeight: 1.66,
                fontSize: "1.12rem",
                background: "rgba(245,247,255,0.86)",
                borderRadius: 14,
                padding: "14px 30px",
                boxShadow: "0 2px 10px rgba(59,96,197,0.10)",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, type: "tween" }}
            >
              Tüm araçların, masrafların ve planların tek ekranda. Bakımını
              takip et, kayıtlarını tut, zahmetsizce analiz et – hepsi
              animasyonlu, modern ve şık bir deneyimde. Hızlıca gez, keşfet ve
              kontrolü eline al!
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Tour Sections */}
        <div className="row g-4">
          {sections.map((section, index) => (
            <motion.div
              className="col-12"
              key={section.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <div
                className="card border-0 shadow-sm overflow-hidden position-relative"
                style={{
                  borderRadius: 24,
                  background:
                    "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                  border: "1.3px solid #e3eafb",
                  boxShadow: "0 12px 34px rgba(59,96,197,.08)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -42,
                    right: -42,
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    background: "rgba(59,96,197,.08)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: -45,
                    left: -45,
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: "rgba(247,211,88,.13)",
                  }}
                />

                <div className="card-body p-3 p-md-4 p-lg-5 position-relative">
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
                          boxShadow: "0 8px 18px rgba(59,96,197,.07)",
                        }}
                      >
                        <i className={`bi ${section.icon} me-2`} />
                        {section.label}
                      </span>

                      <h2
                        className="fw-bold mb-2"
                        style={{
                          color: "#274a78",
                          fontSize: "clamp(1.45rem, 3vw, 2rem)",
                        }}
                      >
                        {section.title}
                      </h2>

                      <h5
                        className="fw-semibold mb-3"
                        style={{ color: "#3b60c5", lineHeight: 1.45 }}
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
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          background:
                            "linear-gradient(135deg, #eef4ff, #fff8e8)",
                          border: "1.3px solid rgba(59,96,197,0.18)",
                          boxShadow: "0 0 38px rgba(59,96,197,.10)",
                        }}
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className="img-fluid w-100"
                          style={{
                            borderRadius: 16,
                            maxHeight: 410,
                            objectFit: "cover",
                            objectPosition: "top",
                            boxShadow: "0 12px 30px rgba(40,65,133,.16)",
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mx-auto mt-5"
          style={{ maxWidth: 760 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: 24,
              background: "rgba(255,255,255,.94)",
              border: "1.3px solid #e3eafb",
            }}
          >
            <div className="card-body p-4 p-lg-5">
              <h2 className="h4 fw-bold mb-2" style={{ color: "#284185" }}>
                AutoTracker ile araç yönetimini sadeleştirin
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#4a5b75",
                  lineHeight: 1.7,
                }}
              >
                Araçlarınızı, bakımlarınızı, notlarınızı, takiplerinizi ve
                raporlarınızı tek bir düzenli platformda yönetin.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

export default ProductTourPage;
