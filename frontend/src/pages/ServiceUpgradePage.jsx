import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function ServiceUpgradePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "👥",
      title: "Müşteri Yönetimi",
      text: "Müşteri bilgilerini, iletişim detaylarını ve servis geçmişini düzenli şekilde takip edin.",
    },
    {
      icon: "🚗",
      title: "Araç Takibi",
      text: "Müşterilere ait araçları plaka, marka, model ve bakım geçmişiyle birlikte yönetin.",
    },
    {
      icon: "🛠️",
      title: "İş Emirleri",
      text: "Servise gelen araçlar için iş emri oluşturun, durum takibi yapın ve işlem maliyetlerini görün.",
    },
    {
      icon: "💳",
      title: "Cari Hesap",
      text: "Alacak, verecek, ödeme durumu ve tahsilat süreçlerini servis panelinden takip edin.",
    },
    {
      icon: "📦",
      title: "Stok ve Parça",
      text: "Yedek parça stoklarınızı, satışlarınızı ve stok finans raporlarınızı kontrol altında tutun.",
    },
    {
      icon: "📊",
      title: "Servis Dashboardu",
      text: "Müşteri, araç, iş emri ve gelir özetlerini tek ekranda hızlıca analiz edin.",
    },
  ];

  const steps = [
    "Servis bilgilerini oluştur",
    "Müşteri ve araç kayıtlarını ekle",
    "İş emirlerini ve ödemeleri takip et",
  ];

  return (
<PageWrapper>
    <div className="service-upgrade-page">
      <div className="container py-5">
        <div className="hero-card border-0 shadow-lg">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="badge-soft mb-3">
                <i className="bi bi-stars me-2" />
                AutoTracker Service Modülü
              </div>

              <h1 className="hero-title mb-3">
                Servis operasyonlarını tek panelden yönetin.
              </h1>

              <p className="hero-text mb-4">
                Müşteri, araç, iş emri, stok, cari hesap ve servis notlarını
                aynı sistem altında toplayarak daha düzenli ve izlenebilir bir
                servis yönetimi oluşturun.
              </p>

              <div className="d-flex gap-2 flex-wrap mb-4">
                <span className="mini-chip">Müşteri Takibi</span>
                <span className="mini-chip">İş Emri Yönetimi</span>
                <span className="mini-chip">Cari Hesap</span>
                <span className="mini-chip">Stok Finans</span>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-primary btn-lg px-4"
                  onClick={() => navigate("/service/setup")}
                >
                  <i className="bi bi-arrow-right-circle me-2" />
                  Servis Hesabı Oluştur
                </button>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="preview-card">
                <div className="preview-top">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="preview-body">
                  <div className="preview-title">
                    <div>
                      <small>AutoTracker Service</small>
                      <h5>Servis Paneli</h5>
                    </div>
                    <div className="preview-icon">🔧</div>
                  </div>

                  <div className="preview-stats">
                    <PreviewStat label="Müşteri" value="124" />
                    <PreviewStat label="İş Emri" value="38" />
                    <PreviewStat label="Tahsilat" value="₺82K" />
                  </div>

                  <div className="preview-line w-100" />
                  <div className="preview-line w-75" />
                  <div className="preview-line w-50" />

                  <div className="preview-status mt-4">
                    <span>Aktif işler</span>
                    <strong>12</strong>
                  </div>

                  <div className="preview-status">
                    <span>Bekleyen alacak</span>
                    <strong>₺18.400</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-4">
          {features.map((feature) => (
            <div className="col-md-6 col-xl-4" key={feature.title}>
              <div className="feature-card h-100">
                <div className="feature-icon">{feature.icon}</div>
                <h5>{feature.title}</h5>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="info-panel h-100">
              <h3>Servisler için sade ve kullanışlı iş akışı</h3>

              <p>
                AutoTracker Service, küçük ve orta ölçekli otomotiv servisleri
                için günlük operasyonları daha takip edilebilir hale getirmek
                üzere tasarlanmıştır.
              </p>

              <div className="workflow">
                {steps.map((step, index) => (
                  <div className="workflow-item" key={step}>
                    <div className="workflow-number">{index + 1}</div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="cta-panel h-100">
              <div className="cta-icon">🚀</div>
              <h3>Hemen başlayın</h3>
              <p>
                Servis hesabınızı oluşturduktan sonra müşteri, araç ve iş emri
                kayıtlarını yönetmeye başlayabilirsiniz.
              </p>

              <button
                className="btn btn-primary w-100 btn-lg"
                onClick={() => navigate("/service/setup")}
              >
                Servis Hesabı Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .service-upgrade-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(59, 96, 197, .12), transparent 32%),
              linear-gradient(135deg, #f7f9ff 0%, #eef3fb 48%, #ffffff 100%);
          }

          .hero-card {
            border-radius: 30px;
            padding: 46px;
            background:
              linear-gradient(135deg, rgba(255,255,255,.96), rgba(246,249,255,.92));
            box-shadow:
              0 26px 70px rgba(24, 38, 90, .13),
              inset 0 1px 0 rgba(255,255,255,.8);
          }

          .badge-soft {
            display: inline-flex;
            align-items: center;
            padding: 9px 14px;
            border-radius: 999px;
            background: rgba(59, 96, 197, .1);
            color: #18265a;
            font-weight: 800;
            font-size: 13px;
          }

          .hero-title {
            color: #18265a;
            font-size: clamp(34px, 5vw, 58px);
            line-height: 1.05;
            font-weight: 900;
            letter-spacing: -1.8px;
          }

          .hero-text {
            color: #687089;
            font-size: 17px;
            line-height: 1.75;
            max-width: 680px;
          }

          .mini-chip {
            padding: 8px 12px;
            border-radius: 999px;
            background: #fff;
            color: #18265a;
            border: 1px solid #e8edf7;
            font-weight: 700;
            font-size: 13px;
            box-shadow: 0 8px 20px rgba(24, 38, 90, .05);
          }

          .preview-card {
            border-radius: 26px;
            overflow: hidden;
            background: #0f1c49;
            box-shadow: 0 24px 60px rgba(24, 38, 90, .24);
            transform: rotate(1deg);
          }

          .preview-top {
            height: 44px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 18px;
            background: rgba(255,255,255,.08);
          }

          .preview-top span {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: rgba(255,255,255,.45);
          }

          .preview-body {
            padding: 24px;
            color: white;
          }

          .preview-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
          }

          .preview-title small {
            color: rgba(255,255,255,.6);
          }

          .preview-title h5 {
            margin: 2px 0 0;
            font-weight: 850;
          }

          .preview-icon {
            width: 52px;
            height: 52px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,.12);
            font-size: 25px;
          }

          .preview-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 22px;
          }

          .preview-stat {
            background: rgba(255,255,255,.1);
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 16px;
            padding: 13px;
          }

          .preview-stat small {
            color: rgba(255,255,255,.6);
          }

          .preview-stat strong {
            display: block;
            font-size: 20px;
            margin-top: 4px;
          }

          .preview-line {
            height: 12px;
            border-radius: 999px;
            background: rgba(255,255,255,.12);
            margin-bottom: 10px;
          }

          .preview-status {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-top: 1px solid rgba(255,255,255,.12);
            color: rgba(255,255,255,.75);
          }

          .preview-status strong {
            color: #fff;
          }

          .feature-card,
          .info-panel,
          .cta-panel {
            border-radius: 24px;
            background: rgba(255,255,255,.9);
            border: 1px solid rgba(226,232,246,.9);
            box-shadow: 0 16px 38px rgba(24, 38, 90, .08);
          }

          .feature-card {
            padding: 26px;
            transition: transform .22s ease, box-shadow .22s ease;
          }

          .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 46px rgba(24, 38, 90, .13);
          }

          .feature-icon {
            width: 54px;
            height: 54px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5ff;
            font-size: 26px;
            margin-bottom: 16px;
          }

          .feature-card h5,
          .info-panel h3,
          .cta-panel h3 {
            color: #18265a;
            font-weight: 850;
          }

          .feature-card p,
          .info-panel p,
          .cta-panel p {
            color: #6b7280;
            line-height: 1.65;
            margin-bottom: 0;
          }

          .info-panel,
          .cta-panel {
            padding: 32px;
          }

          .workflow {
            margin-top: 24px;
            display: grid;
            gap: 12px;
          }

          .workflow-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px;
            border-radius: 16px;
            background: #f7f9ff;
            color: #18265a;
            font-weight: 750;
          }

          .workflow-number {
            width: 34px;
            height: 34px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #18265a;
            color: white;
            font-weight: 900;
          }

          .cta-panel {
            background:
              linear-gradient(135deg, #18265a 0%, #2d4fb2 100%);
            color: white;
          }

          .cta-panel h3,
          .cta-panel p {
            color: white;
          }

          .cta-panel p {
            opacity: .82;
          }

          .cta-icon {
            width: 68px;
            height: 68px;
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,.15);
            font-size: 34px;
            margin-bottom: 18px;
          }

          @media (max-width: 768px) {
            .hero-card {
              padding: 28px;
            }

            .preview-card {
              transform: none;
            }
          }
        `}
      </style>
    </div>
    </PageWrapper>
  );
}

function PreviewStat({ label, value }) {
  return (
    <div className="preview-stat">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default ServiceUpgradePage;