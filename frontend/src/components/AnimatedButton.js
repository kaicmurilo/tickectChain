import { Button } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function AnimatedButton({ children, ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

export default AnimatedButton;
