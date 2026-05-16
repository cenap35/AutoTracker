import Logo from "../components/Logo";
import AnimatedText from "../components/deneme";

function HomePage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px - 60px)",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        background: "linear-gradient(135deg, #f0f4fd 70%, #dde6fd 100%)",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sol: Hoş Geldiniz Kartı */}
      <div
        style={{
          flex: "0 0 500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 48px 80px 96px",
          background: "rgba(255,255,255,0.92)",
          borderRight: "1.5px solid #e4e9f4",
          boxShadow: "10px 0 36px -16px #dfe7ff55",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 70,
        }}
      >
        <Logo size={86} />
        <div
          style={{
            marginTop: 38,
            marginBottom: 16,
            fontWeight: 800,
            color: "#314286",
            fontSize: 38,
            letterSpacing: "1px",
            textShadow: "0 2px 5px rgba(60,80,180,0.07)",
            textAlign: "left",
            lineHeight: 1.25,
          }}
        >
          <AnimatedText text="Hoş Geldiniz !!" />
          
        </div>
        
        <div
          style={{
            marginTop: 2,
            marginBottom: 18,
            fontSize: 21,
            color: "#42508b",
            lineHeight: "1.8",
            maxWidth: 380,
            textAlign: "left",
            background: "linear-gradient(90deg, #dee8fa00 70%, #d9deeec8 100%)",
            padding: "11px 18px 11px 0",
            borderRadius: 7,
            boxShadow: "0 1px 8px rgba(100,110,180,0.03)",
          }}
        >
          Araçlarınızı kolayca yönetin,
          <br />
          geçmiş kayıtlarınızı güvenle saklayın.
          <br />
          Başlamak için kaydolun veya giriş yapın.
        </div>
        <div style={{ marginTop: 18 }}>
          <a
            href="/register"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              background: "linear-gradient(90deg, #4364fa 90%, #5c88fe 100%)",
              color: "#fff",
              borderRadius: 5,
              fontWeight: 600,
              fontSize: 17,
              textDecoration: "none",
              marginRight: 14,
              boxShadow: "0 3px 12px #4364fa30",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #4058d1 60%, #4d74de 100%)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #4364fa 90%, #5c88fe 100%)")
            }
          >
            Kayıt Ol
          </a>
          <a
            href="/login"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              background: "#fff",
              color: "#314286",
              borderRadius: 5,
              fontWeight: 600,
              fontSize: 17,
              textDecoration: "none",
              border: "1.5px solid #4364fa",
              transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#f1f5ff";
              e.target.style.color = "#2140b5";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#314286";
            }}
          >
            Giriş Yap
          </a>
        </div>
      </div>

      {/* Sağ: Özellikler & Açıklamalar */}
      <div
        style={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "70px 64px",
          background:
            "linear-gradient(141deg,rgba(255,255,255,0.35) 60%,#eef2fd 99%)",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.45)",
            borderRadius: 16,
            boxShadow: "0 6px 36px -8px #aac8ff40",
            padding: "40px 46px 34px 38px",
            maxWidth: 600,
            width: "100%",
            borderLeft: "8px solid #4f6fff",
          }}
        >
          <h3
            style={{
              color: "#4f6fff",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: ".5px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <i
              className="bi bi-info-circle"
              style={{
                color: "#4f6fff",
                fontSize: 22,
                opacity: 0.92,
                marginTop: -3,
              }}
            ></i>
            AutoTracker Nedir?
          </h3>
          <ul
            style={{
              fontSize: 18.2,
              color: "#364179",
              lineHeight: "2.0",
              paddingLeft: 24,
              margin: 0,
              listStyle: "square",
              fontWeight: 500,
            }}
          >
            <li>
              <b>Bakım ve masraflarınızı</b> tek ekrandan yönetin, takipte
              kalın.
            </li>
            <li>
              <b>Benzin, sigorta, muayene kayıtlarınızı</b> kolayca dijital
              ortamda saklayın.
            </li>
            <li>
              <b>Anlık raporlar ve grafiklerle</b> aracınıza dair tüm geçmişi
              görün.
            </li>
            <li>
              <b>Bildirimlerle</b> verimliliğinizi artırın, zamanı kaçırmayın.
            </li>
            <li>
              <b>Bütün cihazlarla uyumlu</b> ve sade bir arayüz deneyimi.
            </li>
          </ul>
          <div
            style={{
              marginTop: 26,
              background: "#e6eeff",
              borderRadius: 9,
              padding: "14px 19px",
              fontSize: 16.2,
              color: "#3a3f58",
              boxShadow: "0 2px 12px #aac8ff21",
              maxWidth: 480,
              fontStyle: "italic",
            }}
          >
            Daha fazla avantaj için, şimdi hesap oluşturup denemeye başlayın!
          </div>
        </div>
        <div
          style={{
            marginTop: 38,
            color: "#b2c0de",
            fontWeight: 500,
            fontSize: 15,
            opacity: 0.9,
            letterSpacing: "1px",
            textAlign: "right",
            width: "100%",
            userSelect: "none",
          }}
        >
          <i className="bi bi-cloud-arrow-up" style={{ marginRight: 7 }}></i>
          Verileriniz güvenli ve gizli biçimde saklanır.
        </div>
      </div>
    </div>
  );
}

export default HomePage;
