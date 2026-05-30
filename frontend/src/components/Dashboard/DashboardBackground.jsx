function DashboardBackground({ children }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background:
          "linear-gradient(118deg, #e8f0fe 0%, #f4f7ff 45%, #fff8eb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, #c5dffd55 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, #f7d35833 0%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default DashboardBackground;