import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";

const SubmitButton = ({ loading }) => (
  <div className="pt-4 flex justify-center items-center col-span-1 sm:col-span-2">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={loading}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
    >
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        "Register"
      )}
    </motion.button>
  </div>
);

export default SubmitButton;
