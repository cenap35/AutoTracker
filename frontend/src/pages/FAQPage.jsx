import PageWrapper from "../components/PageWrapper";

function FAQPage() {
  const faqs = [
    {
      question: "AutoTracker nedir?",
      answer:
        "AutoTracker; araç bakım, masraf, not ve takip kayıtlarını tek panelden yönetmenizi sağlayan bir araç takip uygulamasıdır.",
    },
    {
      question: "Hangi bilgileri takip edebilirim?",
      answer:
        "Araç bilgileri, bakım kayıtları, masraflar, notlar, sigorta, kasko, MTV ve muayene gibi takipleri kaydedebilirsiniz.",
    },
    {
      question: "Email doğrulama neden gerekli?",
      answer:
        "Email doğrulama, hesabın gerçek bir kullanıcıya ait olduğunu kontrol etmek ve güvenliği artırmak için kullanılır.",
    },
    {
      question: "Şifremi unutursam ne yapmalıyım?",
      answer:
        "Giriş sayfasındaki Şifremi Unuttum bağlantısından email adresinizi girerek şifre sıfırlama bağlantısı alabilirsiniz.",
    },
    {
      question: "Verilerim güvende mi?",
      answer:
        "Kullanıcı işlemleri JWT tabanlı kimlik doğrulama ile korunur. Her kullanıcı yalnızca kendi araç ve kayıtlarına erişebilir.",
    },
    {
      question: "AutoTracker ücretsiz mi?",
      answer:
        "AutoTracker şu anda kişisel portfolyo ve ürün geliştirme amaçlı geliştirilen bir projedir.",
    },
  ];

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="text-center mb-5">
          <p
            className="small text-uppercase fw-semibold mb-2"
            style={{ color: "#3b60c5", letterSpacing: "1px" }}
          >
            Yardım Merkezi
          </p>

          <h1 className="fw-bold mb-3" style={{ color: "#284185" }}>
            Sık Sorulan Sorular
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 620 }}>
            AutoTracker hakkında en sık merak edilen sorular ve kısa cevaplar.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion">
              {faqs.map((item, index) => (
                <div className="accordion-item border-0 border-bottom" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button fw-semibold ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>

                  <div
                    id={`faq-${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default FAQPage;