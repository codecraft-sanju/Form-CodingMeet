import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaImage,
} from "react-icons/fa";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    ageClass: "",
    skillLevel: "Beginner",
    courses: [],
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
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
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "courses") data.append(key, JSON.stringify(val));
      else data.append(key, val);
    });
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, data);
      toast.success("Registration successful!");
      setLoading(false);
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      toast.error("Error submitting form");
      setLoading(false);
    }
  };

  const inputClass =
    "peer w-full bg-white/30 border border-gray-300 text-gray-900 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
  
      {[
        { name: "fullName", label: "Full Name", type: "text", icon: <FaUser /> },
        { name: "email", label: "Email", type: "email", icon: <FaEnvelope /> },
        { name: "mobile", label: "Mobile Number", type: "text", icon: <FaPhone /> },
        { name: "dob", label: "Date of Birth", type: "date", icon: <FaGraduationCap /> }

      ].map(({ name, label, type, icon }) => (
        <div key={name} className="relative w-full">
          <span className="absolute left-3 top-5 text-gray-500">{icon}</span>
          <input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            placeholder=" "
            className={inputClass}
          />
          <label className="absolute left-10 top-2 text-sm text-black font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
            {label}
          </label>
        </div>
      ))}

    
      <div className="w-full">
        <label className="block mb-1 text-sm text-black font-medium">Skill Level</label>
        <div className="flex gap-4">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm text-gray-800">
              <input
                type="radio"
                name="skillLevel"
                value={level}
                checked={formData.skillLevel === level}
                onChange={handleChange}
                className="accent-indigo-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-2">
        <label className="block mb-1 text-sm text-black font-medium">Select Courses</label>
        <div className="flex flex-wrap gap-4">
          {[
            "HTML",
            "CSS",
            "JS",
            "React",
            "MERN Stack",
            "Full Stack Development",
          ].map((course) => (
            <label key={course} className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="courses"
                value={course}
                onChange={handleChange}
                checked={formData.courses.includes(course)}
                className="accent-purple-600"
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block mb-1 text-sm text-black font-medium flex items-center gap-2">
          <FaImage />
          Upload Profile Picture
        </label>
        <input
          name="profilePic"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white/70 text-black file:text-black"
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
        disabled={loading}
        className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all w-full"
      >
        {loading ? "sending......." : "Register"}
      </motion.button>
    </motion.form>
  );
}
