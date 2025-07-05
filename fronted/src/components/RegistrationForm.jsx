import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import { useUserContext } from "../context/UserContext";
import InstructionsModal from "./InstructionsModal";
import UserInputFields from "./UserInputFields";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    learningPath: "",
    skillLevel: "Beginner",
    courses: [],
    profilePic: null,
    dob: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const { users, fetchUsers } = useUserContext();

  useEffect(() => {
    const load = async () => {
      await fetchUsers();
      setUsersLoaded(true);
      const timer = setTimeout(() => setIsPageLoading(false), 1000);
      return () => clearTimeout(timer);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "courses") {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((c) => c !== value),
      }));
    } else if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "courses") data.append(key, JSON.stringify(val));
      else data.append(key, val);
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, data);
      toast.success("Registration successful!");
      fetchUsers();

      if (formData.email === "sanjaychoudhury693@gmail.com") {
        window.location.href = "/admin";
      }

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        learningPath: "",
        skillLevel: "Beginner",
        courses: [],
        profilePic: null,
        dob: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error submitting form");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "peer w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-10 placeholder-transparent";

  const SimpleLoader = ({ text }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center justify-center py-20"
    >
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-indigo-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        {text}
      </p>
    </motion.div>
  );

  if (isPageLoading) return <SimpleLoader text="Loading Registration Form..." />;
  if (isLoading) return <SimpleLoader text="Submitting your registration..." />;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full text-center mb-8"
      >
        <div className="inline-block bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl shadow-xl border border-purple-400/40 hover:shadow-purple-500/50 transition-all">
          <p className="text-white text-lg sm:text-xl font-medium">
            {usersLoaded && (
              <>
                <CountUp
                  end={users.length}
                  duration={2}
                  separator=","
                  className="text-yellow-400 text-3xl font-extrabold"
                />{" "}
                learners already joined{" "}
                <span className="text-pink-400 font-semibold">CodingMeet</span>!
              </>
            )}
          </p>
        </div>
      </motion.div>

      <div className="text-center mt-6">
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-gradient-to-r mb-3 from-indigo-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition"
        >
          View Class Instructions
        </button>
      </div>

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <UserInputFields
          formData={formData}
          handleChange={handleChange}
          inputClass={inputClass}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all w-full"
        >
          Register
        </motion.button>
      </motion.form>
    </>
  );
}
