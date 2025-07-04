import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCheckCircle,
  FaRegClock,
  FaRegUserCircle,
  FaShareAlt,
  FaMailBulk,
  FaWifi,
  FaCode,
  FaTimes,
} from "react-icons/fa";

export default function InstructionsModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center ml-2 mr-2 justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative bg-gray-900 text-white max-w-3xl w-full rounded-2xl shadow-2xl p-8 sm:p-10 overflow-y-auto max-h-[90vh] border border-indigo-500/30"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-red-400 transition text-xl"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-indigo-400 mb-6 flex items-center gap-3"
          >
            <FaCode className="text-indigo-300 text-3xl" />
            CodingMeet Class Instructions
          </motion.h2>

          <ul className="space-y-5 text-white/90 text-base sm:text-lg leading-relaxed">
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3"
            >
              <FaRegUserCircle className="text-yellow-400 mt-1" />
              Each student will receive a personal one-on-one class — no group sessions.
            </motion.li>

            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3"
            >
              <FaWifi className="text-green-400 mt-1" />
              Ensure a strong internet connection to avoid disruptions.
            </motion.li>

            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3"
            >
              <FaRegClock className="text-pink-400 mt-1" />
              Classes begin once 50+ students are registered — spread the word!
            </motion.li>

            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3"
            >
              <FaShareAlt className="text-cyan-400 mt-1" />
              Share CodingMeet in your groups or with friends to help us grow.
            </motion.li>

            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-3"
            >
              <FaMailBulk className="text-purple-400 mt-1" />
              Watch for class updates via Email or WhatsApp.
            </motion.li>

            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-3"
            >
              <FaRegCheckCircle className="text-teal-400 mt-1" />
              All classes are 100% free and include hands-on projects & mentorship.
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
