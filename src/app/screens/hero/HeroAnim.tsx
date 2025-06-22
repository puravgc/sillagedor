"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroAnim = () => {
  return (
    <div className="font-semibold leading-snug text-4xl md:text-7xl">
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Indulge in luxury,
      </motion.span>
      <br />
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        one fragrance at a time.
      </motion.span>
    </div>
  );
};

export default HeroAnim;
