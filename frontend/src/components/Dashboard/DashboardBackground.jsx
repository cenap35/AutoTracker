function DashboardBackground({ children }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #edf4ff 0%, #f8fbff 45%, #fff8e8 100%)",
      }}
    >
      {/* soft blue glow */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: -90,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,123,224,0.18), transparent 65%)",
          filter: "blur(18px)",
        }}
      />

      {/* soft yellow glow */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: 260,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,193,7,0.16), transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(40,65,133,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(40,65,133,0.045) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.15))",
        }}
      />

      {/* top shine */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.9), transparent 42%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

export default DashboardBackground;