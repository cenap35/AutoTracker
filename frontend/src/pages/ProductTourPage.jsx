import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import DashboardBackground from "../components/Dashboard/DashboardBackground";

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
      subtitle: "Araçlarınıza dair tüm bilgilere ve kontrollerine tek yerden ulaşın.",
 
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
      icon: "bi-file-earmark-pdf-fill",
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
              Araç yönetimi, bakım takibi, gider kontrolü, hatırlatmalar,
              notlar ve PDF raporları tek bir modern platformda nasıl
              birleşiyor keşfedin.
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
              >
                <div
                  className="card border-0 shadow-sm overflow-hidden position-relative"
                  style={{
                    borderRadius: 22,
                    background:
                      "linear-gradient(111deg, #f3f8ff 70%, #fffef8 100%)",
                    border: "1.3px solid #e3eafb",
                  }}
                >
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
                          style={{
                            borderRadius: 18,
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
                              borderRadius: 14,
                              maxHeight: 390,
                              objectFit: "cover",
                              objectPosition: "top",
                              boxShadow: "0 12px 30px rgba(40,65,133,.16)",
                            }}
                          />
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