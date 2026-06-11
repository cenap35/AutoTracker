import React from "react";

function Logo({ size = 40 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: size * 0.6,
        cursor: "pointer"
      }}
      className="logo-animated"
    >
      <span
        className="logo-icon-animated"
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
          transition: "transform 0.4s cubic-bezier(.5,1.65,.53,.97), box-shadow 0.4s cubic-bezier(.5,1.65,.53,.97), background 0.4s",
        }}
      >
        <i
          className="bi bi-car-front-fill"
          style={{
            color: "white",
            fontSize: size * 0.6,
            transition: "transform 0.4s cubic-bezier(.5,1.65,.53,.97)"
          }}
        ></i>
      </span>
      <span
        style={{
          color: "#375175",
          letterSpacing: "1px",
          transition: "color 0.3s"
     
        }}
        className="logo-text-animated"
      >
        Auto
        <span
          style={{
            color: "#007bff",
            transition: "color 0.3s"
          }}
        >
          Tracker
        </span>
      </span>
      <style>
        {`
          .logo-animated:hover .logo-icon-animated {
            transform: scale(1.15) rotate(-8deg);
            box-shadow: 0 6px 18px rgba(103,97,255,0.28);
            background: linear-gradient(135deg,#6c63ff 60%,#007bff 100%);
          }
          .logo-animated:hover .logo-text-animated {
            color: #007bff;
          }
          .logo-animated:hover .logo-text-animated span {
            color: #292b36;
          }
          .logo-animated .logo-icon-animated, .logo-animated .logo-text-animated, .logo-animated .logo-text-animated span {
            will-change: transform, color, background, box-shadow;
          }
          .logo-animated:hover .logo-icon-animated .bi-car-front-fill {
            transform: scale(1.2) rotate(2deg);
          }
        `}
      </style>
    </div>
  );
}

export default Logo;