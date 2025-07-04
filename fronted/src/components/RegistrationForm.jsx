import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaImage,
} from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { FiChevronDown } from "react-icons/fi";
import InstructionsModal from "./InstructionsModal";

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
  const [showInstructions, setShowInstructions] = useState(false);
  const { users, fetchUsers } = useUserContext();

  useEffect(() => {
    fetchUsers();
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

  const Loader = () => (
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
        Submitting your registration...
      </p>
    </motion.div>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full text-center mb-8"
      >
        <div className="inline-block bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl shadow-xl border border-purple-400/40 hover:shadow-purple-500/50 transition-all">
          <p className="text-white text-lg sm:text-xl font-medium">
            <CountUp
              end={users.length}
              duration={2}
              separator=","
              className="text-yellow-400 text-3xl font-extrabold"
            />{" "}
            learners already joined{" "}
            <span className="text-pink-400 font-semibold">CodingMeet</span>!
          </p>
        </div>
        </motion.div>
         {/* View Instructions Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-gradient-to-r mb-3 from-indigo-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition"
        >
          View Class Instructions
        </button>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {[{ name: "fullName", label: "Full Name", type: "text", icon: <FaUser /> },
          { name: "email", label: "Email", type: "email", icon: <FaEnvelope /> },
          { name: "mobile", label: "Mobile Number", type: "text", icon: <FaPhone /> },
          { name: "dob", label: "Date of Birth", type: "date", icon: <FaGraduationCap /> },
        ].map(({ name, label, type, icon }) => (
          <div key={name} className="relative w-full">
            <span className="absolute left-3 top-5 text-white/60">{icon}</span>
            <input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              placeholder=" "
              className={inputClass}
            />
            <label className="absolute left-10 top-2 text-sm text-white font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/80 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-300">
              {label}
            </label>
          </div>
        ))}

        <div className="relative w-full">
          <select
            name="learningPath"
            value={formData.learningPath}
            onChange={handleChange}
            required
            className="peer w-full appearance-none bg-white/10 text-white border border-white/30 rounded-xl px-4 pt-6 pb-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent"
          >
            <option value="" disabled hidden>
              Select Learning Path
            </option>
            {["Web Development", "Machine Learning", "Data Analysis", "Cybersecurity", "UI/UX Design"].map((opt) => (
              <option key={opt} className="text-black" value={opt}>{opt}</option>
            ))}
          </select>
          <label className="absolute left-4 top-2 text-sm text-white font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/80 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-300">
            What do you want to learn?
          </label>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80 text-lg">
            <FiChevronDown />
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-1 text-sm text-white font-medium">Skill Level</label>
          <div className="flex gap-4">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={formData.skillLevel === level}
                  onChange={handleChange}
                  className="accent-indigo-400"
              

                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm text-white font-medium">Select Courses</label>
          <div className="flex flex-wrap gap-4">
            {["HTML", "CSS", "JS", "React", "MERN Stack", "Full Stack Development"].map(
              (course) => (
                <label key={course} className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    name="courses"
                    value={course}
                    onChange={handleChange}
              

                    checked={formData.courses.includes(course)}
                    className="accent-purple-400"
                  />
                  {course}
                </label>
              )
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm text-white font-medium flex items-center gap-2">
            <FaImage />
            Upload Profile Picture
          </label>
          <input
            name="profilePic"
            type="file"
            accept="image/*"
<<<<<<< HEAD
              onChange={handleChange}
              required
              
=======
            onChange={handleChange}
            required
>>>>>>> 45c6a4c (intruction add)
            className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/10 text-white file:text-white"
          />
          {formData.profilePic && (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Preview"
              className="mt-3 w-20 h-20 object-cover rounded-full border shadow"
            />
          )}
        </div>

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
