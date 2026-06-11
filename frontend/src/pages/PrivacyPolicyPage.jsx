import PageWrapper from "../components/PageWrapper";

function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="text-center mb-5">
          <p
            className="small text-uppercase fw-semibold mb-2"
            style={{ color: "#3b60c5", letterSpacing: "1px" }}
          >
            Gizlilik
          </p>

          <h1 className="fw-bold mb-3" style={{ color: "#284185" }}>
            Gizlilik Politikası
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
            AutoTracker kullanıcı verilerinin korunmasına önem verir. Bu sayfa,
            hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar.
          </p>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">

            <h5>Toplanan Bilgiler</h5>
            <p>
              AutoTracker; hesap oluşturma sırasında ad, email adresi ve araç
              yönetimi için gerekli kullanıcı verilerini saklar.
            </p>

            <h5>Verilerin Kullanımı</h5>
            <p>
              Toplanan bilgiler yalnızca uygulamanın çalışması, kullanıcı
              deneyiminin geliştirilmesi ve hesap güvenliğinin sağlanması için
              kullanılır.
            </p>

            <h5>Veri Güvenliği</h5>
            <p>
              Kullanıcı hesapları kimlik doğrulama ve yetkilendirme
              mekanizmaları ile korunur. Kullanıcılar yalnızca kendi verilerine
              erişebilir.
            </p>

            <h5>Üçüncü Taraf Hizmetler</h5>
            <p>
              AutoTracker email gönderimi gibi bazı işlemlerde üçüncü taraf
              servislerden yararlanabilir.
            </p>

            <h5>Politika Güncellemeleri</h5>
            <p className="mb-0">
              Bu politika zaman zaman güncellenebilir. Güncel sürüm her zaman bu
              sayfada yayınlanır.
            </p>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default PrivacyPolicyPage;