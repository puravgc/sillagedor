"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Search: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-md p-4"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border p-2 rounded"
              />
              <button onClick={onClose}>
                <IoClose size={24} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Search;
