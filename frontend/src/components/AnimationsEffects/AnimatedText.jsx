import { motion } from "framer-motion";

function AnimatedText({ text }) {
  return (
    <motion.h1
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "100% 50%" }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        background:
          "linear-gradient(90deg, #3b82f6, #ffffff, #3b82f6)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className="display-3 fw-bold text-center"
    >
      {text}
    </motion.h1>
  );
}

export default AnimatedText;