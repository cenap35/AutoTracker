import { motion } from "framer-motion";

function AnimatedText({ text }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 25 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundPosition: ["0% 50%", "100% 50%"],
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
        backgroundPosition: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        background:
          "linear-gradient(90deg, #1e293b, #3b60c5, #60a5fa, #1e293b)",
        backgroundSize: "300% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "2px",
        textShadow: "0 4px 20px rgba(59,96,197,0.15)",
      }}
      className="fw-bold"
    >
      {text}
    </motion.h1>
  );
}

export default AnimatedText;