import { motion } from "framer-motion";

function DrivingCarAnimation() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        margin: "0 auto",
        overflow: "hidden",
        padding: "21px 0 14px 0",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ x: -80 }}
        animate={{ x: 360 }}
        transition={{
          duration: 7, // slower animation
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        style={{
          width: 68,
          height: 38,
          display: "flex",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        {/* Blue Car SVG for professional look */}
        <svg
          width="68"
          height="38"
          viewBox="0 0 68 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <rect
            x="6"
            y="17"
            width="56"
            height="13"
            rx="5"
            fill="#3b60c5"
            stroke="#233074"
            strokeWidth="1.7"
          />
          <rect
            x="17"
            y="10"
            width="34"
            height="12"
            rx="6"
            fill="#5ea2ff"
            stroke="#233074"
            strokeWidth="1.3"
          />
          <ellipse
            cx="19"
            cy="32.5"
            rx="6"
            ry="5.2"
            fill="#eaf2fb"
            stroke="#3047b2"
            strokeWidth="2"
          />
          <ellipse
            cx="49"
            cy="32.5"
            rx="6"
            ry="5.2"
            fill="#eaf2fb"
            stroke="#3047b2"
            strokeWidth="2"
          />
          {/* Windows */}
          <rect
            x="21"
            y="13"
            width="9"
            height="8"
            rx="3"
            fill="#eaf2fb"
          />
          <rect
            x="37.5"
            y="13"
            width="9"
            height="8"
            rx="3"
            fill="#eaf2fb"
          />
          {/* Headlights */}
          <ellipse
            cx="62.5"
            cy="23"
            rx="3"
            ry="2"
            fill="#fdbe38"
            opacity="0.70"
          />
          {/* Shadow under car */}
          <ellipse
            cx="34"
            cy="36"
            rx="20"
            ry="3"
            fill="#3b60c5"
            opacity="0.12"
          />
        </svg>
      </motion.div>
      <div
        style={{
          height: 4,
          marginTop: -8,
          background:
            "linear-gradient(90deg, transparent, #3b60c5 45%, #5ea2ff 60%, transparent)",
          borderRadius: 999,
          opacity: 0.38,
        }}
      />
    </div>
  );
}

export default DrivingCarAnimation;