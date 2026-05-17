import Logo from "../components/Logo";
import AnimatedText from "../components/deneme";
import PageWrapper from "../components/PageWrapper";

function HomePage() {
  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "calc(100vh - 56px - 60px)",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(117deg, #e8eeff 55%, #fffaf0 100%)",
          margin: 0,
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hareketli dekoratif şekiller */}
        <svg
          width="1100"
          height="520"
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <ellipse
            cx="350"
            cy="200"
            rx="230"
            ry="120"
            fill="#c5dffd"
            opacity="0.23"
          >
            <animate
              attributeName="rx"
              values="230;270;220;230"
              dur="7s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="840"
            cy="390"
            rx="150"
            ry="80"
            fill="#faefd7"
            opacity="0.18"
          >
            <animate
              attributeName="ry"
              values="80;60;100;80"
              dur="8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="600"
            cy="90"
            rx="90"
            ry="38"
            fill="#95c6ff"
            opacity="0.19"
          >
            <animate
              attributeName="cy"
              values="90;110;85;90"
              dur="6.6s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
        {/* Sol: Ortada AnimatedText ve eğlenceli illüstrasyon */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background:
              "radial-gradient(circle at 45% 55%, #fafdff 68%, #e5effc 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Hareketli emoji ve bulutlar */}
          <div
            style={{
              position: "absolute",
              left: "17%",
              top: "22%",
              fontSize: 54,
              opacity: 0.72,
              filter: "drop-shadow(0 2px 8px #92beff99)",
              animation:
                "float-emoji1 4.3s ease-in-out infinite alternate-reverse",
              userSelect: "none",
              zIndex: 2,
            }}
          >
            🚗
          </div>
          <div
            style={{
              position: "absolute",
              left: "28%",
              top: "73%",
              fontSize: 44,
              opacity: 0.64,
              animation:
                "float-emoji2 5.8s ease-in-out infinite alternate-reverse",
              userSelect: "none",
              zIndex: 2,
            }}
          >
            ⛽
          </div>
          <div
            style={{
              position: "absolute",
              right: "14%",
              top: "18%",
              fontSize: 38,
              opacity: 0.53,
              animation:
                "float-emoji3 3.9s ease-in-out infinite alternate",
              userSelect: "none",
              zIndex: 2,
            }}
          >
            🛠️
          </div>
          <div
            style={{
              position: "absolute",
              right: "25%",
              bottom: "15%",
              fontSize: 42,
              opacity: 0.49,
              animation:
                "float-emoji4 7s ease-in-out infinite alternate",
              userSelect: "none",
              zIndex: 2,
            }}
          >
            ☁️
          </div>
          {/* İçerik */}
          <div
            style={{
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5vw 0 2vw 0",
              width: "100%",
              maxWidth: 490,
              position: "relative",
            }}
          >
            <Logo size={80} style={{ marginBottom: 10 }} />
            <div
              style={{
                margin: "48px 0 21px 0",
                fontWeight: 900,
                fontSize: 45,
                letterSpacing: "2px",
                lineHeight: 1.12,
                textAlign: "center",
                background:
                  "linear-gradient(99deg, #2255c6 12%, #7ed7ff 77%, #ffb121 99%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                textShadow: "0 8px 26px #6faafd33",
                filter: "drop-shadow(0 3px 16px #cbe2ff1e)",
                userSelect: "none",
                transition: "font-size 0.25s",
              }}
            >
              <AnimatedText text="Hoş Geldiniz !!" />
            </div>
            <div
              style={{
                marginTop: 13,
                marginBottom: "3.9vw",
                color: "#204582",
                fontSize: 23,
                fontWeight: 600,
                textAlign: "center",
                lineHeight: 1.54,
                background: "rgba(254,253,248,0.97)",
                borderRadius: 19,
                padding: "17px 31px 15px 31px",
                boxShadow: "0 2px 28px 0 #bdccfb09, 0 3px 18px #e8f3ff33",
                letterSpacing: ".11px",
                maxWidth: 380,
                border: "1.3px solid #e3eafb",
                backdropFilter: "saturate(120%)",
                transition: "box-shadow 0.2s",
              }}
            >
              <span style={{ color: "#148cfa", fontWeight: 800 }}>
                Eğlenceli, canlı ve akıllı<br />
                araç yönetimi deneyimi!
              </span>
            </div>
            {/* Alt animasyon: Hareketli dots */}
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginTop: 8,
                paddingBottom: 7,
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background:
                      i % 2
                        ? "#ffb142"
                        : i === 2
                        ? "#148cfa"
                        : "#7ed7ff",
                    opacity: 0.62 + 0.07 * i,
                    animation: `bubblePop ${1 + i * 0.12}s ${
                      0.15 * i
                    }s ease-in-out infinite alternate`,
                    display: "inline-block",
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
        {/* SAĞ: animasyonlu reklam sloganları ve smiley */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "linear-gradient(114deg, #f7faff 53%, #fff0df 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
          }}
        >
          {/* Eğlenceli üst efekt */}
          <div
            style={{
              position: "absolute",
              top: -48,
              right: -62,
              width: 140,
              height: 140,
              background:
                "radial-gradient(circle, #fedbe3 40%, #eaf6fd00 95%)",
              borderRadius: "50%",
              filter: "blur(5px)",
              zIndex: 1,
              opacity: 0.28,
            }}
          ></div>
          {/* Hareketli gülen yüz */}
          <div
            style={{
              position: "absolute",
              right: "21%",
              top: "12%",
              fontSize: 50,
              opacity: 0.61,
              animation: "spin-smile 3.6s linear infinite",
              zIndex: 2,
              userSelect: "none",
            }}
          >
            😎
          </div>
          <div
            style={{
              zIndex: 3,
              width: "100%",
              maxWidth: 510,
              background: "rgba(255,255,255,0.99)",
              borderRadius: 22,
              boxShadow:
                "0 22px 64px -9px #c9e7ff34, 0 3px 20px #faffd633",
              padding: "54px 38px 47px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: "1.3px solid #f1edff",
              backdropFilter: "blur(1.2px)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#ffb142",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: "1.1px",
                marginBottom: 23,
                display: "flex",
                alignItems: "center",
                gap: 15,
                textShadow: "0 4px 28px #efd86c11",
                opacity: 0.96,
              }}
            >
              <span role="img" aria-label="star">
                <i className="bi bi-magic"></i>
              </span>
              <span>AutoTracker'la Sıkılma!</span>
            </div>
            <ul
              style={{
                fontSize: 22,
                color: "#1c3967",
                lineHeight: "2.13",
                margin: 0,
                marginBottom: 27,
                paddingLeft: 21,
                listStyle: "disc",
                fontWeight: 600,
                opacity: 0.97,
                transition: "font-size 0.25s",
              }}
            >
              <li>
                <span style={{ color: "#079bda", fontWeight: 800 }}>
                  Araç masraflarını
                </span>{" "}
                eğlenceli animasyonlarla takip et!
              </li>
              <li>
                <span style={{ color: "#ff7c3c", fontWeight: 800 }}>
                  Gülümseten bildirimler
                </span>{" "}
                seni bilgilendirir.
              </li>
              <li>
                <span style={{ color: "#47c172", fontWeight: 800 }}>
                  Canlı grafiklerle
                </span>{" "}
                oynayıp geçmişini gör :)
              </li>
              <li>
                <span style={{ color: "#3455d1", fontWeight: 800 }}>
                  Modern ve renkli arayüz
                </span>{" "}
                ile deneyimini güzelleştir!
              </li>
              <li>
                <span style={{ color: "#9775fa", fontWeight: 800 }}>
                  Her cihazda
                </span>
                {" "}aynı eğlence!
              </li>
            </ul>
            {/* Hareketli şerit */}
            <div
              style={{
                marginTop: 6,
                width: "109%",
                height: 26,
                background:
                  "repeating-linear-gradient(95deg, #feca47 0 16px, #f7faff 18px 34px, #90e7ff 36px 48px)",
                borderRadius: 8,
                opacity: 0.23,
                marginLeft: "-5%",
                filter: "blur(0.5px)",
                animation: "move-strip 3s linear infinite",
              }}
            />
            <div
              style={{
                marginTop: 14,
                background:
                  "linear-gradient(94deg, #e2f8fd 60%, #eaf6fd 100%)",
                borderRadius: 10,
                padding: "15px 20px",
                fontSize: 18,
                color: "#3176ce",
                boxShadow: "0 2px 14px #aac8ff19",
                width: "100%",
                fontStyle: "italic",
                fontWeight: 500,
                border: "1.1px solid #dbebfa",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 2,
              }}
            >
              <i
                className="bi bi-lightning-charge"
                style={{ color: "#ffd155", fontSize: 20 }}
              ></i>
              <span>
                Hayat karmaşık olabilir ama <b>araç yönetimi</b> artık eğlenceli!
              </span>
            </div>
          </div>
        </div>
        {/* Styles/Animations */}
        <style>{`
          @keyframes float-emoji1 {
            0% { transform: translateY(-2px) scale(1); }
            100% { transform: translateY(18px) scale(1.07);}
          }
          @keyframes float-emoji2 {
            0% { transform: translateY(0) rotate(-3deg);}
            100% { transform: translateY(-18px) rotate(5deg);}
          }
          @keyframes float-emoji3 {
            0% { transform: translateY(0); }
            100% { transform: translateY(16px);}
          }
          @keyframes float-emoji4 {
            0% { transform: translateY(-5px);}
            100% { transform: translateY(14px);}
          }
          @keyframes spin-smile {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          @keyframes bubblePop {
            0% { transform: scale(1);}
            100% { transform: scale(1.2);}
          }
          @keyframes move-strip {
            0% { background-position-x: 0; }
            100% { background-position-x: 48px; }
          }
          @media (max-width: 1100px) {
            div[style*="flex-direction: row"] {
              flex-direction: column !important;
            }
            div[style*="maxWidth: 510px"] {
              margin-bottom: 7vh !important;
              max-width: 100vw !important;
              border-radius: 12px !important;
            }
            div[style*="padding: 54px 38px 47px 40px"] {
              padding: 32px 4vw 23px 4vw !important;
            }
          }
          @media (max-width: 700px) {
            div[style*="padding: 5vw 0 2vw 0"] {
              padding: 2vw 0 2vw 0 !important;
            }
            div[style*="padding: 17px 31px 15px 31px"] {
              padding: 9px 4vw 11px 4vw !important;
              font-size: 14.9px !important;
            }
            div[style*="font-size: 45px"] {
              font-size: 27px !important;
              margin: 26px 0 7px 0 !important;
            }
            ul[style*="font-size: 22px"] {
              font-size: 14.5px !important;
            }
            ul[style*="font-size: 20px"] {
              font-size: 14px !important;
            }
          }
          @media (max-width: 480px) {
            div[style*="border-radius: 19px"] {
              border-radius: 7px !important;
            }
            div[style*="border-radius: 22px"] {
              border-radius: 7px !important;
            }
            div[style*="font-size: 23px"] {
              font-size: 13.2px !important;
              border-radius: 6px !important;
            }
            div[style*="padding: 9px 4vw 11px 4vw"] {
              font-size: 10.9px !important;
              padding: 5px 2vw !important;
            }
            ul[style*="font-size: 14.5px"] {
              font-size: 11.9px !important;
            }
            ul[style*="font-size: 14px"] {
              font-size: 10.5px !important;
            }
          }
        `}</style>
      </div>
    </PageWrapper>
  );
}

export default HomePage;
