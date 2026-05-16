import { motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 50, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, y: 40, filter: "blur(6px)" }}
      transition={{
        opacity: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.38, ease: [0.43, 0.13, 0.23, 0.96] },
        scale: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.29 }
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;