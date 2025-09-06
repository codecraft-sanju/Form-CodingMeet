import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => (
  <div>
    <div className="w-full h-2 bg-gray-700 rounded">
      <motion.div
        className="h-full bg-purple-500 rounded"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <p className="text-right text-sm text-gray-400 mt-1">{Math.round(progress)}%</p>
  </div>
);

export default ProgressBar;
