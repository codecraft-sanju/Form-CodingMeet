import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from 'react';
import InstructionsModal from './InstructionsModal';

const Premium = () => {
    const navigate = useNavigate();
      const [showInstructions, setShowInstructions] = useState(false);
    
  return (
    <>
      <div className="top-4 right-4 mt-15 z-50 lg:hidden block flex items-center gap-3 sm:gap-4">
        {/* Premium Access Button */}
        <motion.button
          onClick={() => navigate("/hackathon")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold px-4 py-2 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm hover:from-orange-600 hover:to-yellow-500 transition-all"
        >
          Premium Access
        </motion.button>

        {/* Instructions Button */}
        <motion.button
          onClick={() => setShowInstructions(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          View Instructions
              </motion.button>
               {showInstructions && (
                      <InstructionsModal onClose={() => setShowInstructions(false)} />
                    )}
      </div>
    </>
  );
}

export default Premium;
