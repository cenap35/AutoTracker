import PageWrapper from "../components/PageWrapper";

function TermsOfServicePage() {
  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="text-center mb-5">
          <p
            className="small text-uppercase fw-semibold mb-2"
            style={{ color: "#3b60c5", letterSpacing: "1px" }}
          >
            Kullanım
          </p>

          <h1 className="fw-bold mb-3" style={{ color: "#284185" }}>
            Kullanım Şartları
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
            AutoTracker kullanımıyla ilgili temel şartlar ve kullanıcı
            sorumlulukları.
          </p>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <h5>Hizmetin Kullanımı</h5>
            <p>
              AutoTracker; araç bakım, masraf, not ve takip kayıtlarını yönetmek
              amacıyla geliştirilmiş bir uygulamadır. Kullanıcılar uygulamayı
              yalnızca yasal ve uygun amaçlarla kullanmalıdır.
            </p>

            <h5>Hesap Güvenliği</h5>
            <p>
              Kullanıcılar hesap bilgilerini korumaktan ve hesapları üzerinden
              yapılan işlemlerden sorumludur.
            </p>

            <h5>Veri Doğruluğu</h5>
            <p>
              Uygulamaya girilen araç, bakım, masraf ve takip bilgilerinin
              doğruluğu kullanıcının sorumluluğundadır.
            </p>

            <h5>Hizmet Değişiklikleri</h5>
            <p>
              AutoTracker zaman içinde yeni özellikler ekleyebilir, mevcut
              özellikleri değiştirebilir veya geliştirebilir.
            </p>

            <h5>Sorumluluk Reddi</h5>
            <p className="mb-0">
              AutoTracker, araç bakım ve takip süreçlerini kolaylaştırmayı
              amaçlar; resmi bakım, sigorta, vergi veya muayene yükümlülüklerinin
              takibi konusunda nihai sorumluluk kullanıcıya aittir.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default TermsOfServicePage;