import React from "react";

function Logo({ size = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: size * 0.7 }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          background: "linear-gradient(135deg,#007bff 60%,#6c63ff 100%)",
          borderRadius: "50%",
          marginRight: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        }}
      >
        <i
          className="bi bi-car-front-fill"
          style={{ color: "white", fontSize: size * 0.6 }}
        ></i>
      </span>
      <span style={{ color: "#24292f", letterSpacing: "1px" }}>
        Auto
        <span style={{ color: "#007bff" }}>Tracker</span>
      </span>
    </div>
  );
}

export default Logo;